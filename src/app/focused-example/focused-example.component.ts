import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-focused-example',
  templateUrl: './focused-example.component.html',
  styleUrls: ['./focused-example.component.scss'],
})
export class FocusedExampleComponent {
  collection = [
    {
      id: 1,
      text: '1',
    },
    {
      id: 2,
      text: '2',
    },
    {
      id: 3,
      text: '4',
    },
  ];

  constructor(private mainService: MainService) {
    this.mainService.breadcrumbs = [this.mainService.breadcrumbs[0], { title: 'examples.focused.title' }];
  }
}
