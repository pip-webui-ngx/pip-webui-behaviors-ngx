import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslocoService } from '@ngneat/transloco';
import { PipHotkeysService } from 'pip-webui-behaviors-ngx';
import { PipThemesService, Theme } from 'pip-webui-themes-ngx';
import { combineLatest, map, Observable } from 'rxjs';

import { ExmapleListItem } from './examples-list/shared/ExampleListItem';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ctx$: Observable<{
    currentTheme: Theme;
    themes: Theme[];
  }>;
  public themes: Theme[];
  public theme: Theme;
  public url: string;

  public list: ExmapleListItem[] = [
    {
      name: 'Selectable',
      id: 'selectable',
      route: 'selectable',
    },
    {
      name: 'Focused',
      id: 'focused',
      route: 'focused',
    },
    {
      name: 'Infinite scroll',
      id: 'infinite-scroll',
      route: 'infinite_scroll',
    },
    {
      name: 'Infinite page',
      id: 'infinite-scroll-page',
      route: 'infinite_page',
    },
    {
      name: 'Draggable',
      id: 'draggable',
      route: 'draggable',
    },
    {
      name: 'Hotkeys',
      id: 'hotkeys',
      route: 'hotkeys',
    },
  ];
  @ViewChild('sidenav') sidenav: MatSidenav;

  public constructor(
    private location: Location,
    private pipHotkeys: PipHotkeysService,
    private pipThemes: PipThemesService,
    public mainService: MainService,
    public media: MediaObserver,
    public translate: TranslocoService,
  ) {
    this.pipThemes.selectTheme(this.pipThemes.config.defaultThemeName);
    this.mainService.breadcrumbs = [{ title: 'title' }];
    this.ctx$ = combineLatest({
      currentTheme: this.pipThemes.currentTheme$,
      themes: this.pipThemes.themes$.pipe(map((themes) => Array.from(themes.values()))),
    });

    this.pipHotkeys.add({
      hotkey: 'ctrl+alt+l',
      action: () => {
        this.translate.setActiveLang(this.translate.getActiveLang() === 'en' ? 'ru' : 'en');
      },
    });
    this.pipHotkeys.add({
      hotkey: 'ctrl+alt+f',
      navigationCommand: ['focused'],
    });
  }

  changeTheme(theme: Theme) {
    this.pipThemes.selectTheme(theme.name);
  }
}
