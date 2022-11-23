import { Directive, ElementRef, HostListener, Host, Input, Renderer2 } from '@angular/core';
import { PipSelectedComponent } from './selected.component';

@Directive({
    selector: '[pipSelectable]'
})
export class PipSelectableDirective {
    private onClickEvent: Function;
    private _class = 'pip-selectable';
    @Input() set pipSelectable(className: string) {
        if (className) {
            this._class = className;
            this.setClass();
        }
    }

    constructor(private elRef: ElementRef, private renderer: Renderer2, @Host() selected: PipSelectedComponent) {
        this.setClass();
        this.onClickEvent = selected.onClickEvent;
        selected.addItem();
    }

    private setClass() {
        this.renderer.addClass(this.elRef.nativeElement, this._class);
    }

    @HostListener('click') click() {
        this.onClickEvent(this.elRef.nativeElement);
    }

    @HostListener('keypress') keydown() { }
}
