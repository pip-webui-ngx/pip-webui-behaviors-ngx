import { Component } from '@angular/core';

@Component({
  selector: 'app-draggable-example',
  templateUrl: './draggable-example.component.html',
  styleUrls: ['./draggable-example.component.scss']
})
export class DraggableExampleComponent {

  public content: any[] = [
    {
      color: { 'background-color': '#F1F8E9' },
      name: 'F1F8E9'
    },
    {
      color: { 'background-color': '#DCEDC8' },
      name: 'DCEDC8'
    },
    {
      color: { 'background-color': '#C5E1A5' },
      name: 'C5E1A5'
    },
    {
      color: { 'background-color': '#AED581' },
      name: 'AED581'
    },
    {
      color: { 'background-color': '#9CCC65' },
      name: '9CCC65'
    },
    {
      color: { 'background-color': '#8BC34A' },
      name: '8BC34A'
    },
    {
      color: { 'background-color': '#7CB342' },
      name: '7CB342'
    },
    {

      color: { 'background-color': '#689F38' },
      name: '689F38'
    },
    {

      color: { 'background-color': '#558B2F' },
      name: '558B2F'
    },
    {

      color: { 'background-color': '#33691E' },
      name: '33691E'
    }
  ];

  public onDragStart = (event, index) => {
  }

  public onEnter(event, index) {

  }

  public onDragMove = () => {

  }

  public onDragStop = () => {

  }

  public onDropSuccess = (event, index) => {
    const otherObj = this.content[index];
    const otherIndex = this.content.indexOf(event.data);
    if (otherIndex === index || otherIndex === -1) { return; }

    this.content.splice(otherIndex, 1);
    if (index > otherIndex) {
      this.content.splice(index, 0, event.data);
    } else {
      this.content.splice(index + 1, 0, event.data);
    }
  }
}
