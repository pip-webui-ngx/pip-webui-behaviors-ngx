import { Component, HostBinding } from '@angular/core';
import random from 'lodash-es/random';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-infinite-scroll-page-example',
  templateUrl: './infinite-scroll-page-example.component.html',
  styleUrls: ['./infinite-scroll-page-example.component.scss'],
})
export class InfiniteScrollPageExampleComponent {
  private _itemCount = 0;
  public items: any[] = [];

  @HostBinding('class.pip-infinite-scroll-page-example') klass = true;

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
