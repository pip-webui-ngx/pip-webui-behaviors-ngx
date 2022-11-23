import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipSelectableComponent } from './selectable.component';
import { PipSelectableDirective } from './selectable.directive';

@NgModule({
    declarations: [
        PipSelectableComponent,
        PipSelectableDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PipSelectableComponent,
        PipSelectableDirective
    ],
    providers: [],
})
export class PipSelectableModule { }
