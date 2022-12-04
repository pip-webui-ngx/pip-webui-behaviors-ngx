import { Component, HostListener } from '@angular/core';
import random from 'lodash-es/random';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-infinite-scroll-example',
  templateUrl: './infinite-scroll-example.component.html',
  styleUrls: ['./infinite-scroll-example.component.scss'],
})
export class InfiniteScrollExampleComponent {
  public items: any[] = [];
  private _itemCount = 0;

  @HostListener('class.pip-infinite-scroll-example') klass = true;

  constructor(private mainService: MainService) {
    this.mainService.breadcrumbs = [this.mainService.breadcrumbs[0], { title: 'examples.infinite-scroll.title' }];
    this.generateItems(20);
  }

  generateItems = function (count) {
    if (this.items.length >= 200) {
      return;
    }

    const colors = ['red', 'blue', 'yellow', 'green'];

    for (let i = 0; i < count; i++) {
      const item = {
        id: this._itemCount,
        name: 'Item ' + this._itemCount,
        color: colors[random(0, colors.length - 1)],
      };
      this._itemCount++;

      this.items.push(item);
    }
  };
}
