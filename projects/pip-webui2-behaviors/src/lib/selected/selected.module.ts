import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PipSelectedComponent } from './selected.component';
import { PipSelectableDirective } from './selectable.directive';

@NgModule({
  declarations: [
    PipSelectedComponent,
    PipSelectableDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PipSelectedComponent,
    PipSelectableDirective
  ],
  providers: [],
})
export class PipSelectedModule { }
