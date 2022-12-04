import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { PipFocusedModule } from 'pip-webui-behaviors-ngx';

import { FocusedExampleComponent } from './focused-example.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    TranslocoModule,

    PipFocusedModule,
  ],
  declarations: [FocusedExampleComponent],
})
export class FocusedExampleModule {}
