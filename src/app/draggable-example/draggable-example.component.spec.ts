import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PipDraggableModule } from 'pip-webui2-behaviors';

import { DraggableExampleComponent } from './draggable-example.component';

describe('DraggableExampleComponent', () => {
  let component: DraggableExampleComponent;
  let fixture: ComponentFixture<DraggableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableExampleComponent],
      imports: [
        CommonModule,
        MatCardModule,
        TranslateModule.forRoot(),

        PipDraggableModule
      ],
    })
      .compileComponents();
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
