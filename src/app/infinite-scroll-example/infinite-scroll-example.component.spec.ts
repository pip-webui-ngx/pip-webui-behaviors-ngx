import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PipInfiniteScrollModule } from 'pip-webui2-behaviors';

import { InfiniteScrollExampleComponent } from './infinite-scroll-example.component';

describe('InfiniteScrollExampleComponent', () => {
  let component: InfiniteScrollExampleComponent;
  let fixture: ComponentFixture<InfiniteScrollExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollExampleComponent],
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
    fixture = TestBed.createComponent(InfiniteScrollExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
