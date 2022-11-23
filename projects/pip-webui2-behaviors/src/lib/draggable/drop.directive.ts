import { Directive, ElementRef, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { PipDraggableService } from './shared/draggable.service';

@Directive({
    selector: '[pipDrop]'
})
export class PipDropDirective implements OnInit, AfterViewInit, OnDestroy {
    @Output() public set pipDrop(enable: boolean) {
        this._dropEnabled = enable;
    }
    @Output() dropSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() enter: EventEmitter<any> = new EventEmitter<any>();
    @Output() leave: EventEmitter<any> = new EventEmitter<any>();
    @Output() diactive: EventEmitter<any> = new EventEmitter<any>();

    private _lastDropTouch: any;
    private _myid: number | string;
    private _dropEnabled = true;
    private _isTouching = false;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private draggableService: PipDraggableService
    ) {

    }

    ngOnInit() { }

    ngAfterViewInit() {
        this.toggleListeners(true);
    }

    ngOnDestroy() {
        this.onDestroy();
    }

    private toggleListeners(enable) {
        // remove listeners
        if (!enable) {
            return;
        }
        // add listeners.
        this.draggableService.on('draggable:start', (evt, obj) => {
            this.onDragStart(evt, obj);
        });
        this.draggableService.on('draggable:move', (evt, obj) => {
            this.onDragMove(evt, obj);
        });
        this.draggableService.on('draggable:end', (evt, obj) => {
            this.onDragEnd(evt, obj);
        });
    }

    private onDestroy() {
        this.toggleListeners(false);
    }

    private onEnableChange(newVal, oldVal) {
        this._dropEnabled = newVal;
    }

    private onDragStart(evt, obj) {
        if (!this._dropEnabled) { return; }
        this.isTouching(obj.x, obj.y, obj.element, evt, obj);
    }

    private onDragMove(evt, obj) {
        if (!this._dropEnabled) { return; }
        this.isTouching(obj.x, obj.y, obj.element, evt, obj);
    }

    private onDragEnd(evt, obj) {
        // don't listen to drop events if this is the element being dragged
        // only update the styles and return
        if (!this._dropEnabled) {
            this.updateDragStyles(false, obj.element);
            return;
        }

        if (this.isTouching(obj.x, obj.y, obj.element, evt, obj)) {
            // call the pipDraggable pipDragSuccess element callback
            if (obj.callback) {
                obj.callback(obj);
            }

            if (this.dropSuccess) {
                setTimeout(() => {
                    this.dropSuccess.emit({
                        data: obj.data,
                        event: obj,
                        target: this.elRef.nativeElement
                    });
                }, 0);
            }

            if (this.diactive) {
                setTimeout(() => {
                    this.diactive.emit({
                        data: obj.data,
                        event: obj,
                        // $target: this.$scope.$eval(this.$scope.value)
                    });
                }, 0);
            }
        }

        this.updateDragStyles(false, obj.element);
    }

    private isTouching(mouseX, mouseY, dragElement, evt, obj) {
        const touching = this.hitTest(mouseX, mouseY);
        if (touching !== this._isTouching) {
            if (touching) {
                this.enter.emit({
                    data: obj.data,
                    event: obj
                    // $target: this.$scope.$eval(this.$scope.value)
                });
            } else {
                this.leave.emit({
                    data: obj.data,
                    event: obj
                    // $target: this.$scope.$eval(this.$scope.value)
                });
            }
        }

        this._isTouching = touching;
        if (touching) {
            this._lastDropTouch = this.elRef.nativeElement;
        }
        this.updateDragStyles(touching, dragElement);
        return touching;
    }

    private updateDragStyles(touching, dragElement) {
        if (touching) {
            this.elRef.nativeElement.classList.add('pip-drag-enter');
            dragElement.classList.add('pip-drag-over');
        } else if (this._lastDropTouch === this.elRef.nativeElement) {
            this._lastDropTouch = null;
            this.elRef.nativeElement.classList.remove('pip-drag-enter');
            dragElement.classList.remove('pip-drag-over');
        }
    }

    private hitTest(x, y) {
        const bounds = this.elRef.nativeElement.getBoundingClientRect();
        x -= document.body.scrollLeft + document.documentElement.scrollLeft;
        y -= document.body.scrollTop + document.documentElement.scrollTop;
        return x >= bounds.left &&
            x <= bounds.right &&
            y <= bounds.bottom &&
            y >= bounds.top;
    }
}
