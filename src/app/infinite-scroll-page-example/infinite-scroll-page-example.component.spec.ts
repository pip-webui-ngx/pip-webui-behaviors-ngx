import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { PipInfiniteScrollModule } from 'pip-webui-behaviors-ngx';

import { InfiniteScrollPageExampleComponent } from './infinite-scroll-page-example.component';

describe('InfiniteScrollPageExampleComponent', () => {
  let component: InfiniteScrollPageExampleComponent;
  let fixture: ComponentFixture<InfiniteScrollPageExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollPageExampleComponent],
      imports: [CommonModule, MatCardModule, TranslocoTestingModule, PipInfiniteScrollModule],
    }).compileComponents();
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
