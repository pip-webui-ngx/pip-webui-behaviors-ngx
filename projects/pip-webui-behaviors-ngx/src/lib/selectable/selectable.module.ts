import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipSelectableComponent } from './selectable.component';
import { PipSelectableDirective } from './selectable.directive';

@NgModule({
  declarations: [PipSelectableDirective, PipSelectableComponent],
  imports: [CommonModule],
  exports: [PipSelectableDirective, PipSelectableComponent],
  providers: [],
})
export class PipSelectableModule {}
