import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { PipFocusedDirective } from './focused.directive';

@Component({
    template: `
        <mat-card pipFocused>
            <mat-list class="pip-menu pip-ref-list">
                <mat-list-item class="pip-focusable"
                             tabindex="-1">example</mat-list-item>
                <mat-list-item class="pip-focusable"
                             tabindex="-1">example</mat-list-item>
                <mat-list-item class="pip-focusable"
                             tabindex="-1">example</mat-list-item>
                <mat-list-item class="pip-focusable"
                             tabindex="-1">example</mat-list-item>
                <mat-list-item class="pip-focusable"
                             tabindex="-1">example</mat-list-item>
                <mat-list-item class="pip-focusable"
                             tabindex="-1">example</mat-list-item>
            </mat-list>
        </mat-card>
    `
})
class TestFocusedComponent { }

describe('focused.directive', () => {
    let component: TestFocusedComponent;
    let fixture: ComponentFixture<TestFocusedComponent>;
    let cardEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestFocusedComponent,
                PipFocusedDirective
            ],
            imports: [
                MatCardModule,
                MatListModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestFocusedComponent);
        component = fixture.componentInstance;
        cardEl = fixture.debugElement.query(By.css('mat-card'));
    }));
    it('should create the directive', async(() => {
        expect(fixture).toBeTruthy();
    }));
});
