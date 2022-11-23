import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PipInfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
  declarations: [
    PipInfiniteScrollDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PipInfiniteScrollDirective
  ],
  providers: [],
})
export class PipInfiniteScrollModule { }
