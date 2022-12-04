import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { PipInfiniteScrollModule } from 'pip-webui-behaviors-ngx';

import { InfiniteScrollExampleComponent } from './infinite-scroll-example.component';

@NgModule({
  imports: [CommonModule, MatCardModule, TranslocoModule, PipInfiniteScrollModule],
  declarations: [InfiniteScrollExampleComponent],
})
export class InfiniteScrollExampleModule {}
