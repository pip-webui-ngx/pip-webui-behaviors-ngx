import { Directive, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
    selector: '[pipInfiniteScroll]'
})
export class PipInfiniteScrollDirective implements OnDestroy {
    @Input() set scrollParent(parent: boolean) {
        this.changeContainer(parent ? this.elRef.nativeElement.parentElement : this.elRef.nativeElement);
    }
    @Input() set scrollContainer(elSelector: string) {
        const el = this.documentElement.querySelector(elSelector);
        if (el) {
            this.changeContainer(el);
        }
    }
    @Input() set immediateCheck(check: any) {
        if (check) { this.onContainerScrollThrottle(); }
    }
    @Input() set scrollDistance(distance: number) {
        this.handleScrollDistance(distance);
    }
    @Input() set scrollDisable(disable: boolean) {
        this.handleScrollDisabled(disable);
    }
    @Input() set useDocumentBottom(use: boolean) {
        this.handleScrollUseDocumentBottom(use);
    }

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onInfiniteScroll: EventEmitter<any> = new EventEmitter<any>();

    private THROTTLE_MILLISECONDS = 500;
    private checkWhenEnabled: any = null;
    private _scrollContainer: any = null;
    private _immediateCheck: any = true;
    private _scrollDistance: number = null;
    private scrollEnabled = true;
    private unregisterEventListener: Function = null;
    private _useDocumentBottom = false;
    private documentElement: HTMLElement | Document = null;
    private windowElement: HTMLElement | Window = null;
    private onContainerScrollThrottle: Function;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.documentElement = document;
        this.windowElement = window;
        this.onContainerScrollThrottle = this.throttle(() => {
            this.onContainerScroll();
        }, this.THROTTLE_MILLISECONDS);

        this.changeContainer(this.elRef.nativeElement);
    }

    ngOnDestroy() {
        if (this.unregisterEventListener !== null) {
            this.unregisterEventListener();
            return this.unregisterEventListener = null;
        }
    }

    private height(element) {
        element = element[0] || element;
        if (isNaN(element.offsetHeight)) {
            return element.document.documentElement.clientHeight;
        } else {
            return element.offsetHeight;
        }
    }

    private offsetTop(element) {
        if (!element.getBoundingClientRect) {
            return;
        }
        return element.getBoundingClientRect().top + this.pageYOffset(element);
    }

    private pageYOffset(element) {
        element = element[0] || element;
        if (isNaN(window.pageYOffset)) {
            return element.document.documentElement.scrollTop;
        } else {
            return element.ownerDocument.defaultView.pageYOffset;
        }
    }

    private onContainerScroll() {
        let containerBottom,
            containerTopOffset,
            elementBottom,
            remaining,
            result,
            shouldScroll;

        if (this._scrollContainer === this.windowElement) {
            containerBottom = this.height(this._scrollContainer) + this.pageYOffset(this._scrollContainer[0].document.documentElement);
            elementBottom = this.offsetTop(this.elRef.nativeElement) + this.height(this.elRef.nativeElement);
        } else {
            containerBottom = this.height(this._scrollContainer);
            containerTopOffset = 0;
            if (this.offsetTop(this._scrollContainer) !== void 0) {
                containerTopOffset = this.offsetTop(this._scrollContainer);
            }
            elementBottom = this.offsetTop(this.elRef.nativeElement) - containerTopOffset + this.height(this.elRef.nativeElement);
        }

        if (this.useDocumentBottom) {
            elementBottom = this.height((this.elRef.nativeElement[0].ownerDocument
                || (<any>this.elRef.nativeElement[0]).document).documentElement);
        }

        remaining = elementBottom - containerBottom;
        result = this.height(this._scrollContainer) * this._scrollDistance + 1;
        shouldScroll = remaining <= result;

        if (shouldScroll) {
            this.checkWhenEnabled = true;
            if (this.scrollEnabled) {
                this.onInfiniteScroll.emit();
            }
        } else {
            return this.checkWhenEnabled = false;
        }
    }

    private handleScrollDistance(v) {
        return this._scrollDistance = parseFloat(v) || 0;
    }

    private handleScrollDisabled(v) {
        this.scrollEnabled = !v;
        if (this.scrollEnabled && this.checkWhenEnabled) {
            this.checkWhenEnabled = false;
            this.onContainerScrollThrottle();
        }
    }

    private handleScrollUseDocumentBottom(v) {
        return this._useDocumentBottom = v;
    }

    private changeContainer(newContainer) {
        if (this._scrollContainer) {
            this._scrollContainer.removeEventListener('scroll', () => {
                this.onContainerScrollThrottle();
            });
        }

        this._scrollContainer = newContainer;
        if (newContainer) {
            return this._scrollContainer.addEventListener('scroll', () => {
                this.onContainerScrollThrottle();
            });
        }
    }

    private throttle(func, ms) {

        let isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;

            setTimeout(() => {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }
}
