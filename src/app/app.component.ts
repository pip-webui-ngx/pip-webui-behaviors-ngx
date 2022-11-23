import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { PipHotkeysService } from 'pip-webui2-behaviors';
import { PipThemesService, Theme } from 'pip-webui2-themes';
import { TranslateService } from '@ngx-translate/core';

import { AppTranslations } from './app.strings';
import { ExmapleListItem } from './examples-list/shared/ExampleListItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public list: ExmapleListItem[] = [
    {
      name: 'Selectable',
      id: 'selectable',
      route: 'selectable'
    },
    {
      name: 'Focused',
      id: 'focused',
      route: 'focused'
    },
    {
      name: 'Infinite scroll',
      id: 'infinite-scroll',
      route: 'infinite_scroll'
    },
    {
      name: 'Infinite page',
      id: 'infinite-scroll-page',
      route: 'infinite_page'
    },
    {
      name: 'Draggable',
      id: 'draggable',
      route: 'draggable'
    },
    {
      name: 'Hotkeys',
      id: 'hotkeys',
      route: 'hotkeys'
    }
  ];

  public themesLocalNames: any = {
    'candy-theme': 'Candy',
    'unicorn-dark-theme': 'Unicorn Dark',
    'pip-blue-theme': 'Blue',
    'pip-grey-theme': 'Grey',
    'pip-pink-theme': 'Pink',
    'pip-green-theme': 'Green',
    'pip-navy-theme': 'Navy',
    'pip-amber-theme': 'Amber',
    'pip-orange-theme': 'Orange',
    'pip-dark-theme': 'Dark',
    'pip-black-theme': 'Black',
    'bootbarn-warm-theme': 'Bootbarn Warm',
    'bootbarn-cool-theme': 'Bootbarn Cool',
    'bootbarn-mono-theme': 'Bootbarn Mono',
    'mst-black-theme': 'MST Black',
    'mst-black-dark-theme': 'MST Black Dark',
    'mst-mono-theme': 'MST Mono',
    'mst-orange-theme': 'MST Orange',
    'mst-orange-dark-theme': 'MST Orange Dark',
    'mst-elegant-theme': 'MST Elegant'
  };

  public listIndex = 0;
  public themes: Theme[];
  public selectedTheme: Theme;
  public activeMediaQuery: boolean;
  public mode: string;
  public app = 'Behaviors';
  public url: string;
  public langs: string[] = [];
  public selectedLang = 'en';
  @ViewChild('sidenav') sidenav: MatSidenav;

  public constructor(
    private location: Location,
    private service: PipThemesService,
    public media: MediaObserver,
    private translate: TranslateService,
    private pipHotkeys: PipHotkeysService
  ) {

    this.themes = this.service.themes;
    this.selectedTheme = this.service.selectedTheme;

    translate.setDefaultLang(this.selectedLang);
    translate.use(this.selectedLang);
    this.langs = translate.getLangs();
    this.translate.setTranslation('en', AppTranslations.en, true);
    this.translate.setTranslation('ru', AppTranslations.ru, true);

    media.asObservable().subscribe((change: any) => {
      this.activeMediaQuery = change && change.mqAlias === 'xs' ? true : false;
      this.mode = change && change.mqAlias === 'xs' ? null : 'side';
    });

    this.pipHotkeys.add({
      hotkey: 'ctrl+alt+l',
      action: () => {
        this.selectedLang = this.selectedLang === 'en' ? 'ru' : 'en';
        this.translate.use(this.selectedLang);
      }
    });
    this.pipHotkeys.add({
      hotkey: 'ctrl+alt+f',
      navigationCommand: ['focused']
    });
  }

  public ngOnInit() {
    this.listIndex = Math.max(0, this.list.findIndex((item) => {
      return '/' + item.route === this.location.path();
    }));
  }

  public changeTheme(theme) {
    this.selectedTheme = theme;
    this.service.selectedTheme = this.selectedTheme;
  }

  public changeLanguage(lang) {
    this.selectedLang = lang;
    this.translate.use(lang);
  }

  public onListItemIndexChanged(index: number) {
    this.listIndex = index;
    this.sidenav.close();
  }
}
