import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PipFocusedDirective } from './focused.directive';

@NgModule({
  declarations: [
    PipFocusedDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PipFocusedDirective
  ],
  providers: [],
})
export class PipFocusedModule { }
