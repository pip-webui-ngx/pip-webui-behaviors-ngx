import { Component, OnInit } from '@angular/core';
import { random } from 'lodash';

@Component({
  selector: 'app-infinite-scroll-page-example',
  templateUrl: './infinite-scroll-page-example.component.html',
  styleUrls: ['./infinite-scroll-page-example.component.scss']
})
export class InfiniteScrollPageExampleComponent implements OnInit {
  private _itemCount = 0;
  public items: any[] = [];

  constructor() {
    this.generateItems(20);
  }

  ngOnInit() { }

  public generateItems = function (count) {
    if (this.items.length >= 200) { return; }
    console.log('Generating ' + count + ' items');

    const colors = ['red', 'blue', 'yellow', 'green'];

    for (let i = 0; i < count; i++) {
      const item = {
        id: this._itemCount,
        name: 'Item ' + this._itemCount,
        color: colors[random(0, colors.length - 1)]
      };
      this._itemCount++;

      this.items.push(item);
    }
  };

}
