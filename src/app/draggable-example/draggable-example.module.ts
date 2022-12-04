import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { PipDraggableModule } from 'pip-webui-behaviors-ngx';
import { DraggableExampleComponent } from './draggable-example.component';

@NgModule({
  imports: [CommonModule, MatCardModule, TranslocoModule, PipDraggableModule],
  declarations: [DraggableExampleComponent],
})
export class DraggableExampleModule {}
