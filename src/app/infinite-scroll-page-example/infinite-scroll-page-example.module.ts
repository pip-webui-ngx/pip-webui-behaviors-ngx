import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { PipInfiniteScrollModule } from 'pip-webui-behaviors-ngx';

import { InfiniteScrollPageExampleComponent } from './infinite-scroll-page-example.component';

@NgModule({
  imports: [CommonModule, MatCardModule, TranslocoModule, PipInfiniteScrollModule],
  declarations: [InfiniteScrollPageExampleComponent],
})
export class InfiniteScrollPageExampleModule {}
