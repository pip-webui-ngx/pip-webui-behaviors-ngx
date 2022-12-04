import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ExmapleListItem } from './shared/ExampleListItem';

@Component({
  selector: 'pip-examples-list',
  templateUrl: './examples-list.component.html',
  styleUrls: ['./examples-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ExamplesListComponent {
  @Input() list: ExmapleListItem[];
  @Output() selected = new EventEmitter();

  @HostBinding('class.pip-examples-list') klass = true;
}
