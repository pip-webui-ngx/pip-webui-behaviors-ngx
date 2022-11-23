import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[pipDragCancel]',
})
export class PipDragCancelDirective implements AfterViewInit {
    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        const elements = this.elRef.nativeElement.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            __ngRendererSetElementAttributeHelper(this.renderer, elements[i], 'pip-drag-cancel', 'pip-drag-cancel');
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
