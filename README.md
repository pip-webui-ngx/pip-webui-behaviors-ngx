# <img src="https://github.com/pip-webui/pip-webui/raw/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Attachable behaviors

![](https://img.shields.io/badge/license-MIT-blue.svg)

**pip-webui2-behaviors** module contains behaviors that can be attached to existing controls or pages

### Focusable

**Allows to navigate over focusable controls using arrow keys**

**Using** 

To make the div orange by pressing arrow buttons

```html
<div pipFocused focusedColor="orange">
    <div class="pip-focusable">Focusable</>
    <div class="pip-focusable">Focusable</>
    <div class="pip-focusable">Focusable</>
    <div class="pip-focusable">Focusable</>
    <div class="pip-focusable">Focusable</>
</div>
```

**More generalized example on the image**

<a href="https://github.com/pip-webui2/pip-webui2-behaviors/raw/master/doc/images/focused.png" style="display: block; text-align: center;">
    <img style="max-width: 300px" src="https://github.com/pip-webui2/pip-webui2-behaviors/raw/master/doc/images/focused.png"/>
</a>


### Selectable

**Allows to navigate over non-focuseable elements using arrow keys**

**Using**

```html
<pip-selectable (selected)="selectedIndex = $event.index" [resolver]="customResolver" [index]="selectedIndex">
    <div pipSelectable>Selectable</>
    <div pipSelectable>Selectable</>
    <div pipSelectable>Selectable</>
    <div pipSelectable>Selectable</>
    <div pipSelectable>Selectable</>
</pip-selected>
```

**Example of selected component with using angular-material mat-nav-list on the image**

<a href="https://github.com/pip-webui2/pip-webui2-behaviors/raw/master/doc/images/selected.png" style="display: block; text-align: center;">
    <img style="max-width: 300px" src="https://github.com/pip-webui2/pip-webui2-behaviors/raw/master/doc/images/selected.png"/>
</a>

### Draggable

**Implements drag & drop functionality**

**Using**

Simple example of draggable component to swap containers.

Template:

```html
<div class="drag-scroll-test">
	<div *ngFor="let obj of content; let i = index"
		[scrollContainer]="'.drag-scroll-test'"
		pipDrop="true"
		pipDrag="true"
		(dropSuccess)="onDropSuccess($event, i)">
		<div>
			<p >{{ obj.name }}</p>
		</div>
	</div>
</div>
```

Handler: 

```typescript
onDropSuccess(event, index) {
    const otherObj = this.content[index];
    const otherIndex = this.content.indexOf(event.data);
    if (otherIndex === index || otherIndex === -1) return;

    this.content.splice(otherIndex, 1);
    if (index > otherIndex) this.content.splice(index, 0, event.data);
    else this.content.splice(index + 1, 0, event.data);
}
```

Styles: 

```css
[pipDrag] div {
    padding: 8px;
    box-sizing: border-box;
    transition: all .35s ease;
    height: 85px;
}

[pipDrag].pip-dragging {
    opacity: 0.95;
}

[pipDrag].pip-dragging div {
    height: 85px ;
}

[pipDrop] {
	position: relative;
}

[pipDrop] {
    transition: padding .35s ease;
}

[pipDrop].pip-drag-enter:not(.virtual) {
    padding-bottom: 85px !important;
}
```

**Result on the image**

<a href="https://github.com/pip-webui2/pip-webui2-behaviors/raw/master/doc/images/draggable.png" style="display: block; text-align: center;">
    <img style="max-width: 300px" src="https://github.com/pip-webui2/pip-webui2-behaviors/raw/master/doc/images/draggable.png"/>
</a>

### Infinite Scroll

**Allows to upload data in chunks while user is scrolling**

**Using**

Template:

```html
<div class="app-infinite-scroll pip-scroll" style="margin-left: 0px;">
    <div class="item-container" pipInfiniteScroll (onInfiniteScroll)="generateItems(10)" 
        scrollContainer="'.app-infinite-scroll'"
        scrollDistance="0.1">
        <div class="item" *ngFor="let item of items" >
            {{ item.name }}
        </div>
    </div>
</div>
```

Handler: 

```typescript
generateItems(count) {
    for (let i = 0; i < count; i++) {
      let item = {
        id: this._itemCount,
        name: 'Item ' + this._itemCount
      };
      this._itemCount++;

      this.items.push(item);
    }
};
```

## Installation

To install this module using npm:

```bash
npm install pip-webui2-behaviors --save
```

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
