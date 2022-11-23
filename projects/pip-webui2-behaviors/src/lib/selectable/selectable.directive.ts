import { Directive, ElementRef, HostListener, Host, Input, Renderer2 } from '@angular/core';
import { PipSelectableComponent } from './selectable.component';

@Directive({
    selector: '[pipSelectable]'
})
export class PipSelectableDirective {
    private _class = 'pip-selectable';
    private _value: any;

    @Input() set pipSelectable(className: string) {
        if (className) {
            this._class = className;
            this.setClass();
        }
    }

    @Input() set pipSelectableValue(value: any) {
        this._value = value;
    }

    constructor(
        public elRef: ElementRef,
        private renderer: Renderer2,
        @Host() private selectable: PipSelectableComponent
    ) {
        this.setClass();
    }

    private setClass() {
        this.renderer.addClass(this.elRef.nativeElement, this._class);
    }

    public get value(): any {
        return this._value;
    }

    @HostListener('click') click() {
        if (this.selectable) {
            this.selectable.onClickEvent(this.elRef);
        }
    }
}
