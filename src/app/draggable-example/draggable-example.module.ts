import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PipDraggableModule } from 'pip-webui2-behaviors';

import { DraggableExampleComponent } from './draggable-example.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule.forChild(),

    PipDraggableModule
  ],
  declarations: [DraggableExampleComponent]
})
export class DraggableExampleModule { }
