import { Directive, ElementRef, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { PipDraggableService } from './shared/draggable.service';

@Directive({
    selector: '[pipDrag]'
})
export class PipDragDirective implements OnInit, AfterViewInit, OnDestroy {
    @Output() dragStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() dragMove: EventEmitter<any> = new EventEmitter<any>();
    @Output() dragStop: EventEmitter<any> = new EventEmitter<any>();
    @Output() dragSuccess: EventEmitter<any> = new EventEmitter<any>();

    @Input() allowTransform = false;
    @Input() dragData: any;
    @Input() verticalScroll = true;
    @Input() scrollParent = false;
    @Input() horizontalScroll: boolean;
    @Input() activationDistance = 75;
    @Input() set scrollContainer(container: string) {
        if (!container) {
            return;
        }
        this._scrollContainer = document.querySelector(container);
    }
    @Input() public set drag(newVal: any) {
        this.onEnableChange(newVal, this.prevDrag);
        this.prevDrag = newVal;
    }
    @Input() public set centerAnchor(newVal: boolean) {
        this.onCenterAnchor(newVal, this.prevCenterAnchor);
        this.prevCenterAnchor = newVal;
    }

    private LONG_PRESS = 50; // 50ms for longpress
    private offset: any;
    private _centerAnchor = false;
    private _mx: number;
    private _my: number;
    private _tx: number;
    private _ty: number;
    private _mrx: number;
    private _mry: number;
    // && document instanceof DocumentTouch; // DocumentTouch is not defined!
    private _hasTouch = ('ontouchstart' in window) || (<any>window).DocumentTouch;
    private _pressEvent = 'mousedown';
    private _touchEvent = 'touchstart';
    private _moveEvents = 'mousemove';
    private _touchMoveEvent = 'touchmove';
    private _releaseEvents = 'mouseup';
    private _touchReleaseEvents = 'touchend';
    private _dragHandle: any;

    private _myid: string | number;
    private _data: any = null;

    private _dragOffset: any = null;

    private _dragEnabled = true;

    private _pressTimer: any = null;

    private _elementStyle: any = {};

    private getDragData: any;
    private scrollDistance = 50;
    private _scrollContainer: any = window;

    private prevDrag: any = null;
    private prevCenterAnchor: any = null;

    private _moveListener: any;
    private _releaseListener: any;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private draggableService: PipDraggableService
    ) {
        this._moveListener = (event) => {
            this.onmove(event);
        };

        this._releaseListener = (event) => {
            this.onrelease(event);
        };
    }

    ngOnInit() { }

    ngAfterViewInit() {
        this.initialize();
    }

    ngOnDestroy() {
        this.onDestroy();
    }

    private initialize() {
        __ngRendererSetElementAttributeHelper(this.renderer, this.elRef.nativeElement, 'pip-draggable', 'false'); // prevent native drag
        // check to see if drag handle(s) was specified
        // if querySelectorAll is available, we use this instead of find
        // as JQLite find is limited to tagnames
        let dragHandles: any;
        if (this.elRef.nativeElement.querySelectorAll) {
            dragHandles = this.elRef.nativeElement.querySelectorAll('[pip-drag-handle]');
            // } else {
            //     dragHandles = this.$element.find('[pip-drag-handle]');
            // }
            if (dragHandles.length) {
                this._dragHandle = dragHandles;
            }
            this.toggleListeners(true);

            // Initialize scroll container
            if (this.scrollParent) {
                this._scrollContainer = this.elRef.nativeElement.parentElement;
            }
        }
    }

    private toggleListeners(enable) {
        if (!enable) {
            return;
        }

        // wire up touch events
        if (this._dragHandle) {
            // handle(s) specified, use those to initiate drag
            this._dragHandle.on(this._pressEvent, (event) => {
                this.onpress(event);
            });
        } else {
            // no handle(s) specified, use the element as the handle
            // no handle(s) specified, use the element as the handle
this.renderer.listen(this.elRef.nativeElement, this._pressEvent, (event) => {
    this.onpress(event);
});
            this.renderer.listen(this.elRef.nativeElement, this._touchEvent, (event) => {
    this.onpress(event);
});
        }
        if (!this._hasTouch && this.elRef.nativeElement.nodeName.toLowerCase() === 'img') {
            this.renderer.listen(this.elRef.nativeElement, 'mousedown', () => {
    return false;
}); // prevent native drag for images
        }
    }

    private onDestroy() {
        this.toggleListeners(false);
    }

    private onEnableChange(newVal, oldVal) {
        this._dragEnabled = (newVal);
    }

    private onCenterAnchor(newVal, oldVal) {
        if (newVal !== undefined) {
            this._centerAnchor = (newVal || 'true');
        }
    }

    private isClickableElement(evt: any) {
        const element = evt.target;
        const clickable = !!element.attributes.getNamedItem('pipdragcancel') || !!element.attributes.getNamedItem('pip-drag-cancel');

        return clickable;
    }

    /*
        * When the element is clicked start the drag behaviour
        * On touch devices as a small delay so as not to prevent native window scrolling
        */
    private onpress(evt) {
        if (!this._dragEnabled) { return; }

        if (this.isClickableElement(evt)) {
            return;
        }

        if (evt.type === 'mousedown' && evt.button !== 0) {
            // Do not start dragging on right-click
            return;
        }

        this.saveElementStyles();

        if (this._hasTouch) {
            this.cancelPress();
            this._pressTimer = setTimeout(() => {
                this.cancelPress();
                this.onlongpress(evt);
            }, this.LONG_PRESS);
            document.addEventListener(this._moveEvents, () => {
                this.cancelPress();
            });
            document.addEventListener(this._touchMoveEvent, () => {
                this.cancelPress();
            });
            document.addEventListener(this._releaseEvents, () => {
                this.cancelPress();
            });
            document.addEventListener(this._touchReleaseEvents, () => {
                this.cancelPress();
            });
        } else {
            this.onlongpress(evt);
        }
    }

    private saveElementStyles() {
        this._elementStyle.left = this.elRef.nativeElement.style.left || 0;
        this._elementStyle.top = this.elRef.nativeElement.style.top || 0;
        this._elementStyle.position = this.elRef.nativeElement.style.position;
        this._elementStyle.width = this.elRef.nativeElement.style.width;
    }

    private cancelPress() {
        clearTimeout(this._pressTimer);
        document.removeEventListener(this._moveEvents, () => {
            this.cancelPress();
        });
        document.removeEventListener(this._releaseEvents, () => {
            this.cancelPress();
        });
    }

    private onlongpress(evt) {
        if (!this._dragEnabled) { return; }
        evt.preventDefault();

        this.offset = this.elRef.nativeElement.getBoundingClientRect();
        if (this.allowTransform) {
            this._dragOffset = this.offset;
        } else {
            this._dragOffset = {
                left: document.body.scrollLeft,
                top: document.body.scrollTop
            };
        }


        this.elRef.nativeElement.centerX = this.elRef.nativeElement.offsetWidth / 2;
        this.elRef.nativeElement.centerY = this.elRef.nativeElement.offsetHeight / 2;

        this._mx = this.draggableService.inputEvent(evt).pageX;
        this._my = this.draggableService.inputEvent(evt).pageY;
        this._mrx = this._mx - this.offset.left;
        this._mry = this._my - this.offset.top;
        if (this._centerAnchor) {
            this._tx = this._mx - this.elRef.nativeElement.centerX - window.pageXOffset;
            this._ty = this._my - this.elRef.nativeElement.centerY - window.pageYOffset;
        } else {
            this._tx = this._mx - this._mrx - window.pageXOffset;
            this._ty = this._my - this._mry - window.pageYOffset;
        }

        document.addEventListener(this._moveEvents, this._moveListener);
        document.addEventListener(this._releaseEvents, this._releaseListener);
    }

    private onmove(evt) {
        if (!this._dragEnabled) { return; }

        evt.preventDefault();
        if (!this.elRef.nativeElement.classList.contains('pip-dragging')) {
            this._data = this.dragData;
            this.elRef.nativeElement.classList.add('pip-dragging');
            this.draggableService.broadcast('draggable:start', {
                x: this._mx,
                y: this._my,
                tx: this._tx,
                ty: this._ty,
                event: evt,
                element: this.elRef.nativeElement,
                data: this._data
            });

            if (this.dragStart) {
                this.dragStart.emit({
                    $data: this._data,
                    $event: evt
                });
            }
        }

        this._mx = this.draggableService.inputEvent(evt).pageX;
        this._my = this.draggableService.inputEvent(evt).pageY;

        if (this.horizontalScroll || this.verticalScroll) {
            this.dragToScroll();
        }

        if (this._centerAnchor) {
            this._tx = this._mx - this.elRef.nativeElement.centerX - this._dragOffset.left;
            this._ty = this._my - this.elRef.nativeElement.centerY - this._dragOffset.top;
        } else {
            this._tx = this._mx - this._mrx - this._dragOffset.left;
            this._ty = this._my - this._mry - this._dragOffset.top;
        }

        this.moveElement(this._tx, this._ty);

        this.draggableService.broadcast('draggable:move', {
            x: this._mx,
            y: this._my,
            tx: this._tx,
            ty: this._ty,
            event: evt,
            element: this.elRef.nativeElement,
            data: this._data,
            uid: this._myid,
            dragOffset: this._dragOffset
        });

        if (this.dragMove) {
            this.dragMove.emit({
                $data: this._data,
                $event: evt
            });
        }
    }

    private onrelease(evt) {
        if (!this._dragEnabled) {
            return;
        }
        evt.preventDefault();
        this.draggableService.broadcast('draggable:end', {
            x: this._mx,
            y: this._my,
            tx: this._tx,
            ty: this._ty,
            event: evt,
            element: this.elRef.nativeElement,
            data: this._data,
            callback: this.onDragComplete,
            uid: this._myid
        });
        this.elRef.nativeElement.classList.remove('pip-dragging');
        const dragEnterElemets = this.elRef.nativeElement.parentElement.getElementsByClassName('pip-drag-enter');
        for (let i = 0; i < dragEnterElemets.length; i++) {
            dragEnterElemets[i].classList.remove('pip-drag-enter');
        }

        document.removeEventListener(this._moveEvents, this._moveListener);
        document.removeEventListener(this._releaseEvents, this._releaseListener);
        if (this.dragStop) {
            this.dragStop.emit({
                $data: this._data,
                $event: evt
            });
        }

        setTimeout(() => {
            this.reset();
        });
    }

    private onDragComplete(evt) {
        if (!this.dragSuccess) { return; }

        this.dragSuccess.emit({
            $data: this._data,
            $event: evt
        });
    }

    private reset() {
        this._elementStyle.position == null ? this.renderer.removeStyle(this.elRef.nativeElement, 'position') : this.renderer.setStyle(this.elRef.nativeElement, 'position', this._elementStyle.position);
        this._elementStyle.top == null ? this.renderer.removeStyle(this.elRef.nativeElement, 'top') : this.renderer.setStyle(this.elRef.nativeElement, 'top', this._elementStyle.top);
        this._elementStyle.left == null ? this.renderer.removeStyle(this.elRef.nativeElement, 'left') : this.renderer.setStyle(this.elRef.nativeElement, 'left', this._elementStyle.left);
        this.renderer.setStyle(this.elRef.nativeElement, 'z-index', '');
        this._elementStyle.width == null ? this.renderer.removeStyle(this.elRef.nativeElement, 'width') : this.renderer.setStyle(this.elRef.nativeElement, 'width', this._elementStyle.width);
    }

    private moveElement(x, y) {
        const eWidth = this.elRef.nativeElement.style.width ?
            this.elRef.nativeElement.style.width : this.elRef.nativeElement.offsetWidth;
        this.renderer.setStyle(this.elRef.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.elRef.nativeElement, 'top', y + 'px');
        this.renderer.setStyle(this.elRef.nativeElement, 'left', x + 'px');
        this.renderer.setStyle(this.elRef.nativeElement, 'z-index', '100');
        this.renderer.setStyle(this.elRef.nativeElement, 'width', eWidth + 'px');
    }

    private dragToScroll() {
        let scrollX = 0,
            scrollY = 0;
        const offset = (element) => {
            return {
                left: element.getBoundingClientRect && element.getBoundingClientRect().left || 0,
                top: element.getBoundingClientRect && element.getBoundingClientRect().top || 0
            };
        };

        if (this.horizontalScroll) {
            const
                containerLeft = offset(this._scrollContainer).left,
                containerWidth = this._scrollContainer.offsetWidth,
                containerRight = containerLeft + containerWidth;

            if ((this._mx - containerLeft) < this.activationDistance) {
                scrollX = -this.scrollDistance;
            } else if ((containerRight - this._mx) < this.activationDistance) {
                scrollX = this.scrollDistance;
            }
        }

        if (this.verticalScroll) {
            const
                containerTop = offset(this._scrollContainer).top,
                containerHeight = this._scrollContainer.offsetHeight,
                containerBottom = containerTop + containerHeight;

            if ((this._my - containerTop) < this.activationDistance) {
                scrollY = -this.scrollDistance + 30;
            } else if ((containerBottom - this._my) < this.activationDistance) {
                scrollY = this.scrollDistance - 30;
            }
        }
        if (scrollX !== 0 || scrollY !== 0) {
            const
                containerScrollLeft = this._scrollContainer.scrollLeft,
                containerScrollTop = this._scrollContainer.scrollTop;

            this._scrollContainer.scrollLeft = containerScrollLeft + scrollX;
            this._scrollContainer.scrollTop = containerScrollTop + scrollY;
        }

    }
}

type AnyDuringRendererMigration = any;

function __ngRendererSplitNamespaceHelper(name: AnyDuringRendererMigration) {
    if (name[0] === ":") {
        const match = name.match(/^:([^:]+):(.+)$/);
        return [match[1], match[2]];
    }
    return ["", name];
}

function __ngRendererSetElementAttributeHelper(renderer: AnyDuringRendererMigration, element: AnyDuringRendererMigration, namespaceAndName: AnyDuringRendererMigration, value?: AnyDuringRendererMigration) {
    const [namespace, name] = __ngRendererSplitNamespaceHelper(namespaceAndName);
    if (value != null) {
        renderer.setAttribute(element, name, value, namespace);
    }
    else {
        renderer.removeAttribute(element, name, namespace);
    }
}
