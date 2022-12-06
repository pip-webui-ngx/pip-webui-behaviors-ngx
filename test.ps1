#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component metadata and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$package = Get-Content -Path "$PSScriptRoot/package.json" | ConvertFrom-Json
$container = $component.name

# Set test image name
$testImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-test"

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
docker build -f "$PSScriptRoot/docker/Dockerfile.test" -t $testImage .

# Check if the build was successful
if ($LastExitCode -ne 0) {
    # if retries enabled
    if ($env:RETRY_COUNTER -lt $env:RETRY_MAX_ATTEMPS) {
        # increment retry counter
        $env:RETRY_COUNTER=[int]$env:RETRY_COUNTER+1
        Write-Host "Script failed with error code $LastExitCode. Retry $($env:RETRY_COUNTER) of $($env:RETRY_MAX_ATTEMPS).."
        # rerun script
        . "$PSScriptRoot/test.ps1"
    } else {
        Write-Error "Script failed with error code $LastExitCode. Retries disabled."
    }
}

# Remove container if it exists
if (docker ps -q -a -f name=$container) {
    docker rm $container --force
}
# Run tests
docker run --name $container $testImage /bin/sh -c $package.scripts."test:lib"

# Check if test was successfull
$ErrorActionPreference = "Continue"
$logs = & docker logs $container 2>&1 | %{ "$_" }
$ErrorActionPreference = "Error"
docker rm $container
$testResult = $logs[$logs.Count - 1]
if ($testResult -notmatch "^TOTAL: [0-9]+ SUCCESS$") {
    Write-Error "Some test failed.`n$testResult"
}
