import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { PipSelectableModule } from 'pip-webui2-behaviors';

import { SelectableExampleComponent } from './selectable-example.component';

describe('SelectedExampleComponent', () => {
  let component: SelectableExampleComponent;
  let fixture: ComponentFixture<SelectableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectableExampleComponent],
      imports: [
        CommonModule,
        MatListModule,
        TranslateModule.forRoot(),

        PipSelectableModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
