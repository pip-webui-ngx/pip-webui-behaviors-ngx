import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PipInfiniteScrollModule } from 'pip-webui2-behaviors';

import { InfiniteScrollPageExampleComponent } from './infinite-scroll-page-example.component';

describe('InfiniteScrollPageExampleComponent', () => {
  let component: InfiniteScrollPageExampleComponent;
  let fixture: ComponentFixture<InfiniteScrollPageExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollPageExampleComponent],
      imports: [
        CommonModule,
        MatCardModule,
        TranslateModule.forRoot(),

        PipInfiniteScrollModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollPageExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
