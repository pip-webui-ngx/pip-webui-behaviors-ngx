import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { debounce } from 'lodash';
import { KeyCode } from '../shared/key-code.model';

@Component({
    selector: 'pip-selected',
    template: '<ng-content></ng-content>',
    styleUrls: ['./selected.component.scss']
})
export class PipSelectedComponent implements OnInit, AfterViewInit {

    @Input('index') set indexSetter(index: number) {
        if (this._index === index) { return; }

        this._index = index;
        this.selectItem({
            itemIndex: this._index
        });
    }

    @Input() public set skipHidden(skip: boolean) {
        this._modifier = skip ? ':visible' : '';
    }

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef
    ) {
        renderer.addClass(elRef.nativeElement, 'pip-selected');
        __ngRendererSetElementAttributeHelper(renderer, elRef.nativeElement, 'tabindex', '1');
        renderer.setStyle(elRef.nativeElement, 'outline', 'none');
        renderer.listen(elRef.nativeElement, 'focusin', (event) => {
});
        renderer.listen(elRef.nativeElement, 'keydown', (event) => {
    this.onKeyDown(event);
});

        this.add = debounce(() => {
            this.selectItem({
                itemIndex: this._index
            });
        }, 10);
    }
    private _index = 0;
    private _modifier = ':visible';
    private _prevItem: any = null;
    private timer: any = null;
    @Input() public itemClass = 'pip-selectable';
    @Input() public scrollToItem: boolean;
    @Input() public selectedItemClass = 'pip-selected-item';
    @Input() public disableSelect = false;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onEnterSpacePress: EventEmitter<any> = new EventEmitter<any>();

    private add: Function;

    ngOnInit() { }

    ngAfterViewInit() {
        this.selectItem({
            itemIndex: this._index
        });
    }

    private getElements() {
        return this.elRef.nativeElement.getElementsByClassName(this.itemClass);
    }

    private defineIndex(items) {
        const oldSelectedIndex = this._index;
        this._index = -1;
        for (let index = 0; index < items.length; index++) {
            if (items[index].classList.contains(this.selectedItemClass)) {
                this._index = index;

                break;
            }
        }
    }

    private selectItem(itemParams: any) {
        if (this.disableSelect) {
            this.onSelect.emit(null);
            return;
        }

        const itemIndex = itemParams.itemIndex,
            itemId = itemParams.itemId,
            items: HTMLCollection = itemParams.items || this.getElements(),
            itemsLength = items.length,
            raiseEvent = itemParams.raiseEvent;
        let item = () => {
            if (itemParams.item) {
                return itemParams.item;
            }
            if (itemIndex >= 0 && itemIndex < itemsLength) {
                return items[itemIndex];
            }

            return false;
        };
        item = item();
        if (item) {
            if (this._prevItem) {
                this._prevItem.classList.remove(this.selectedItemClass);
                this._prevItem.classList.remove('mat-list-item-focus');
            }
            item['classList'].add(this.selectedItemClass);
            item['classList'].add('mat-list-item-focus');
            item['focus']();
            this._prevItem = item;
            this._scrollToItem(item);

            if (itemIndex === undefined || itemIndex === -1) {
                this.defineIndex(items);
            }

            if (this.onSelect && itemParams.raiseEvent) {
                this.onSelect.emit({
                    index: this._index,
                    target: this.elRef.nativeElement,
                    item: item,
                    prevItem: this._prevItem
                });
            }
        }
    }

    private _scrollToItem(item: any) {
        if (!this.scrollToItem) { return; }
        const offset = (element) => {
            return {
                left: element.getBoundingClientRect().left || 0,
                top: element.getBoundingClientRect().top || 0
            };
        };

        const
            containerTop = offset(this.elRef.nativeElement).top,
            containerHeight = this.elRef.nativeElement.offsetHeight,
            containerBottom = containerTop + containerHeight,
            itemTop = offset(item).top,
            itemHeight = item.offsetHeight,
            itemBottom = itemTop + itemHeight,
            containerScrollTop = this.elRef.nativeElement.scrollTop;

        if (containerTop > itemTop) {
            this.elRef.nativeElement.scrollTop = containerScrollTop + itemTop - containerTop;
        } else if (containerBottom < itemBottom) {
            this.elRef.nativeElement.scrollTop = containerScrollTop + itemBottom - containerBottom;
        }
    }

    public addItem() {
        this.add();
    }

    public onClickEvent = (element) => {
        this.selectItem({
            item: element,
            raiseEvent: true
        });
    }

    private onKeyDown(event) {
        if (this.disableSelect) {
            this.onSelect.emit(null);
            return;
        }

        const keyCode = event.which || event.keyCode;
        // Check control keyCode
        if (keyCode === KeyCode.ENTER || keyCode === KeyCode.SPACE) {
            event.preventDefault();
            event.stopPropagation();

            if (this.onEnterSpacePress) {
                this.onEnterSpacePress.emit({
                    event: {
                        target: this.elRef.nativeElement,
                        index: this._index,
                        item: this.elRef.nativeElement.querySelector('.selected')
                    }
                });
            }

        } else
            if (keyCode === KeyCode.LEFT_ARROW || keyCode === KeyCode.RIGHT_ARROW ||
                keyCode === KeyCode.UP_ARROW || keyCode === KeyCode.DOWN_ARROW
            ) {
                event.preventDefault();
                event.stopPropagation();

                // Get next selectable control index
                const items = this.getElements(),
                    inc = (keyCode === KeyCode.RIGHT_ARROW || keyCode === KeyCode.DOWN_ARROW) ? 1 : -1;

                this._index = this._index + inc >= items.length ? 0 : this._index + inc < 0 ? items.length - 1 : this._index + inc;

                // Set next control as selected
                this.selectItem({
                    itemIndex: this._index,
                    items: items,
                    raiseEvent: true
                });
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
