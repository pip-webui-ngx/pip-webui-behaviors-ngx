import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { KeyCode } from '../shared/key-code.model';

@Directive({
    selector: '[pipFocused]'
})
export class PipFocusedDirective implements AfterViewInit {
    private _focusedColor: string;
    private _focusedClass = 'mat-focused';
    private _focusedRebind: boolean;
    private _focusedTabindex: number;
    private _focusedOpacity = false;
    private _focusedData: Function;
    private _withHidden: Function;
    private _rebind: Function;

    private controls: HTMLElement[];
    private controlsLength: number;
    private color: string;
    private opacityDelta = 0.04;
    private opacityLimit = 0.1;
    private oldBackgroundColor: string;
    private _prevTrigger: any = null;

    @Input() focusedOpacityClass = 'pip-focused-opaicty';

    @Input() set focusedRebind(rebind) {
        this._focusedRebind = rebind;
    }
    @Input() set focusedOpacity(isOpacity) {
        this._focusedOpacity = isOpacity;
    }
    @Input() set focusedClass(className) {
        this._focusedClass = className;
    }
    @Input() set focusedColor(color) {
        this._focusedColor = color;
    }
    @Input() set focusedTabIndex(index) {
        this._focusedTabindex = index;
    }
    @Input() model: any;
    @Input() focusedData: any;
    @Input() withHidden = true;
    @Input() onFocusClass = '';
    @Input() set dynamicTrigger(changed: any) {
        if (this._prevTrigger == null) { this._prevTrigger = changed; } else if (this._prevTrigger !== changed) {
            setTimeout(() => {
                this.init();
            }, 500);
            this._prevTrigger = changed;
        }
    }

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onEnterSpacePress: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onDeletePress: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {
        __ngRendererSetElementAttributeHelper(renderer, this.elRef.nativeElement, 'tabindex', '1');
        renderer.setStyle(this.elRef.nativeElement, 'outline', 'none');
        renderer.listen(elRef.nativeElement, 'keydown', (event) => {
    this.keydownListener(event);
});
        renderer.listen(elRef.nativeElement, 'focus', () => {
    if (this.controls.length > 0) {
        this.controls[0].focus();
    }
});
    }

    private setControls() {
        const selector = this.withHidden ? '.pip-focusable' : '.pip-focusable:visible';
        this.controls = this.elRef.nativeElement.querySelectorAll(selector);
    }

    private init() {
        this.setControls();
        this.controlsLength = this.controls.length;
        this.checkTabindex(this.controls);
        // Add event listeners
        for (let i = 0; i < this.controlsLength; i++) {
            const element = this.controls[i];
            element.addEventListener('focus', (event) => {
                const target = event.currentTarget;
                if (element.classList.contains('mat-focused')) {
                    return;
                }
                if (this._rebind && this._rebind()) {
                    this.init();
                }
                this.elRef.nativeElement.classList.add('pip-focused-container');
                this.renderer.setStyle(element, 'outline', 'none');
                if (this.onFocusClass) { element.classList.add(this.onFocusClass); }
                if (!this._focusedOpacity) {
                    this.color = element.style.backgroundColor || 'rgba(0, 0, 0, 0)';
                    this.oldBackgroundColor = this.color;
                    this.renderer.setStyle(element, 'background-color', this.rgba(this.color));
                    if (this._focusedClass) { element.classList.add(this._focusedClass); }
                } else {
                    if (this._focusedClass) { element.classList.add(this._focusedClass); }
                    if (this.focusedOpacityClass) { element.classList.add(this.focusedOpacityClass); }
                }
            });

            element.addEventListener('focusout', (event) => {
                const target = event.currentTarget;
                if (!element.classList.contains(this._focusedClass)) {
                    return;
                }
                this.elRef.nativeElement.classList.remove('pip-focused-container');
                if (this.onFocusClass) { element.classList.remove(this.onFocusClass); }
                if (!this._focusedOpacity) {
                    this.renderer.setStyle(element, 'background-color', this.oldBackgroundColor);
                    if (this._focusedClass) { element.classList.remove(this._focusedClass); }
                } else {
                    if (this._focusedClass) { element.classList.remove(this._focusedClass); }
                    if (this.focusedOpacityClass) { element.classList.remove(this.focusedOpacityClass); }
                }
            });
        }
    }

    ngAfterViewInit() {
        this.init();
    }

    private rgba(color) {
        if (this._focusedColor) {
            return this._focusedColor;
        }

        const arr = color.split('(')[1].split(')')[0].split(',');

        if (!arr || arr.length < 3) {
            return '';
        }

        let red, blue, green, opacity;

        opacity = arr.length === 3 ? 1 : parseFloat(arr[3]);
        red = arr[0];
        blue = arr[1];
        green = arr[2];

        if (opacity < this.opacityLimit) {
            opacity += this.opacityDelta;
        } else {
            opacity -= this.opacityDelta;
        }

        return 'rgba(' + red + ', ' + blue + ', ' + green + ', ' + opacity + ')';
    }

    private setTabindex(element, value) {
        element.attr('tabindex', value);
    }

    private checkTabindex(controls) {
        let index = -1;
        for (let i = 0; i < controls.length; i++) {
            const c = controls[i];
            if (c['tabindex'] > -1) {
                index = i;
                return;
            }
        }

        if (index === -1 && controls.length > 0 && this._focusedTabindex) {
            this.setTabindex(controls[0], this._focusedTabindex);
        }
    }

    private keydownListener(e) {
        const keyCode = e.which || e.keyCode;
        // Check control keyCode
        if (keyCode === KeyCode.LEFT_ARROW ||
            keyCode === KeyCode.UP_ARROW ||
            keyCode === KeyCode.RIGHT_ARROW ||
            keyCode === KeyCode.DOWN_ARROW
        ) {
            e.preventDefault();

            const
                increment = (keyCode === KeyCode.RIGHT_ARROW || keyCode === KeyCode.DOWN_ARROW) ? 1 : -1,
                moveToControl = this.getElementIndex(this.controls) + increment;
            // Move focus to next control
            if (moveToControl >= 0 && moveToControl < this.controlsLength) {
                this.controls[moveToControl].focus();
            }
        } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.SPACE) {
            const index = this.getElementIndex(this.controls);
            this.onEnterSpacePress.emit({ event: e, index: index });
        } else if (keyCode === KeyCode.DELETE || keyCode === KeyCode.BACKSPACE) {
            let index = this.getElementIndex(this.controls);
            this.onDeletePress.emit({ event: e, index: index });
            setTimeout(() => {
                this.setControls();
                if (index < this.controls.length) { this.controls[index].focus(); } else if (this.controls.length > 0) {
                    while (index >= this.controls.length && index > -1) { index--; }
                    this.controls[index].focus();
                }
            }, 200);
        }
    }

    private getElementIndex(elements) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains(this._focusedClass)) { return i; }
        }

        return -1;
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
