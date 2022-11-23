import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PipInfiniteScrollModule } from 'pip-webui2-behaviors';

import { InfiniteScrollPageExampleComponent } from './infinite-scroll-page-example.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule.forChild(),

    PipInfiniteScrollModule
  ],
  declarations: [InfiniteScrollPageExampleComponent]
})
export class InfiniteScrollPageExampleModule { }
