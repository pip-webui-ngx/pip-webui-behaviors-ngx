#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component metadata and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$package = Get-Content -Path "$PSScriptRoot/package.json" | ConvertFrom-Json
$container = $component.name

# Set build image name
$buildImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"

# Copy .npmrc to docker folder to use it inside container
if (-not (Test-Path -Path "$PSScriptRoot/docker/.npmrc")) {
    if (-not [string]::IsNullOrEmpty($env:NPM_TOKEN)) {
        Write-Host "Creating docker/.npmrc from environment variable..."
        Set-Content -Path "$PSScriptRoot/docker/.npmrc" -Value "//registry.npmjs.org/:_authToken=$($env:NPM_TOKEN)"
    } elseif (Test-Path -Path "~/.npmrc") {
        Write-Host "Copying ~/.npmrc to docker..."
        Copy-Item -Path "~/.npmrc" -Destination "docker" 
    } else {
        Write-Host "Missing ~/.npmrc file..."
        Set-Content -Path "$PSScriptRoot/docker/.npmrc" -Value ""
    }
}

# build docker image
docker build -f "$PSScriptRoot/docker/Dockerfile.build" -t $buildImage $PSScriptRoot

# Check if the build was successful
if ($LastExitCode -ne 0) {
    # if retries enabled
    if ($env:RETRY_COUNTER -lt $env:RETRY_MAX_ATTEMPS) {
        # Increment retry counter
        $env:RETRY_COUNTER = [int]$env:RETRY_COUNTER + 1
        Write-Host "Script failed with error code $LastExitCode. Retry $($env:RETRY_COUNTER) of $($env:RETRY_MAX_ATTEMPS).."
        # rerun script
        . "$PSScriptRoot/build.ps1"
    } else {
        Write-Error "Script failed with error code $LastExitCode. Retries disabled."
    }
}

# Remove container if it exists
if (docker ps -q -a -f name=$container) {
    docker rm $container --force
}

# Create and copy compiled files, then destroy
docker run --name $container $buildImage /bin/sh -c "$($package.scripts."build:lib")"
# Check if the build was successful
if ($LastExitCode -ne 0) {
    Write-Error "Component build failed with error $LastExitCode"
}

# Copy build result from container
if (Test-Path -Path "$PSScriptRoot/dist") {
    Remove-Item -Recurse -Force "$PSScriptRoot/dist"
}
docker cp "$($container):/usr/src/app/dist" "$PSScriptRoot/dist"
docker rm $container

# Verify that the dist folder was indeed created after the build
if (-not (Test-Path "$PSScriptRoot/dist")) {
    Write-Error "dist folder doesn't exist in root dir. Build failed. See logs above for more information."
}
