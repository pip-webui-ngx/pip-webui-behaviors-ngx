import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pipDragPrevent]',
})
export class PipDragPreventDirective implements AfterViewInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    __ngRendererSetElementAttributeHelper(this.renderer, this.elRef.nativeElement, 'pipDraggable', 'false');
  }

  private toggleListeners(enable) {
    // remove listeners
    if (!enable) {
      return;
    }
    // add listeners.
    // add listeners.
    this.renderer.listen(this.elRef.nativeElement, 'mousedown touchstart touchmove touchend touchcancel', (event) => {
      this.absorbEvent_(event);
    });
  }

  private absorbEvent_(event) {
    const e = event.originalEvent;
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }
}

type AnyDuringRendererMigration = any;

function __ngRendererSplitNamespaceHelper(name: AnyDuringRendererMigration) {
  if (name[0] === ':') {
    const match = name.match(/^:([^:]+):(.+)$/);
    return [match[1], match[2]];
  }
  return ['', name];
}

function __ngRendererSetElementAttributeHelper(
  renderer: AnyDuringRendererMigration,
  element: AnyDuringRendererMigration,
  namespaceAndName: AnyDuringRendererMigration,
  value?: AnyDuringRendererMigration,
) {
  const [namespace, name] = __ngRendererSplitNamespaceHelper(namespaceAndName);
  if (value != null) {
    renderer.setAttribute(element, name, value, namespace);
  } else {
    renderer.removeAttribute(element, name, namespace);
  }
}
