import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DraggableExampleComponent } from './draggable-example/draggable-example.component';
import { FocusedExampleComponent } from './focused-example/focused-example.component';
import { InfiniteScrollExampleComponent } from './infinite-scroll-example/infinite-scroll-example.component';
import { InfiniteScrollPageExampleComponent } from './infinite-scroll-page-example/infinite-scroll-page-example.component';
import { SelectableExampleComponent } from './selectable-example/selectable-example.component';
import { HotkeysExampleComponent } from './hotkeys-example/hotkeys-example.component';

const appRoutes: Routes = [
    { path: 'selectable', component: SelectableExampleComponent },
    { path: 'focused', component: FocusedExampleComponent },
    { path: 'infinite_scroll', component: InfiniteScrollExampleComponent },
    { path: 'infinite_page', component: InfiniteScrollPageExampleComponent },
    { path: 'draggable', component: DraggableExampleComponent },
    { path: 'hotkeys', component: HotkeysExampleComponent },
    { path: '**', redirectTo: 'selectable' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
