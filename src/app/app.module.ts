import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipHotkeysModule } from 'pip-webui-behaviors-ngx';
import { mstThemes, PipThemesModule, pipWebUI2ThemesList } from 'pip-webui-themes-ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DraggableExampleModule } from './draggable-example/draggable-example.module';
import { ExamplesListModule } from './examples-list/examples-list.module';
import { FocusedExampleModule } from './focused-example/focused-example.module';
import { HotkeysExampleModule } from './hotkeys-example/hotkeys-example.module';
import { InfiniteScrollExampleModule } from './infinite-scroll-example/infinite-scroll-example.module';
import { InfiniteScrollPageExampleModule } from './infinite-scroll-page-example/infinite-scroll-page-example.module';
import { SelectableExampleModule } from './selectable-example/selectable-example.module';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    PipThemesModule.forRoot({
      themes: [...pipWebUI2ThemesList, mstThemes['Elegant']],
    }),
    PipHotkeysModule,
    AppRoutingModule,
    ExamplesListModule,
    SelectableExampleModule,
    FocusedExampleModule,
    InfiniteScrollExampleModule,
    InfiniteScrollPageExampleModule,
    HotkeysExampleModule,
    DraggableExampleModule,
    HttpClientModule,
    TranslocoRootModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
