import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { PipDraggableModule } from 'pip-webui-behaviors-ngx';

import { DraggableExampleComponent } from './draggable-example.component';

describe('DraggableExampleComponent', () => {
  let component: DraggableExampleComponent;
  let fixture: ComponentFixture<DraggableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableExampleComponent],
      imports: [CommonModule, MatCardModule, TranslocoTestingModule, PipDraggableModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
