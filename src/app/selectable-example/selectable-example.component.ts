import { Component, ElementRef } from '@angular/core';
import sample from 'lodash/sample';
import { PipSelectableResolverFunction, PipSelectableResolveEvent, PipSelectableResolveEmitData } from 'pip-webui2-behaviors';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MatListItem } from '@angular/material/list';

@Component({
    selector: 'app-selectable-example',
    templateUrl: './selectable-example.component.html',
    styleUrls: ['./selectable-example.component.scss']
})
export class SelectableExampleComponent {

    private _currentIndex$ = new BehaviorSubject<number>(0);
    private _disableResolver: PipSelectableResolverFunction;
    private _items: any[] = [
        { id: '1', title: 'Banana', },
        { id: '2', title: 'Pineapple', },
        { id: '3', title: 'Apple', },
        { id: '4', title: 'Carrot', },
        { id: '5', title: 'Tomato', },
        { id: '6', title: 'Potato', },
        { id: '7', title: 'Cucumber', },
        { id: '8', title: 'Radish', },
        { id: '1', title: 'Banana', },
        { id: '2', title: 'Pineapple', },
        { id: '3', title: 'Apple', },
        { id: '4', title: 'Carrot', },
        { id: '5', title: 'Tomato', },
        { id: '6', title: 'Potato', },
        { id: '7', title: 'Cucumber', },
        { id: '8', title: 'Radish', }
    ];
    private _lastId = 0;
    private _titles = ['Banana', 'Pineapple', 'Apple', 'Carrot', 'Tomato', 'Potato', 'Cucumber', 'Radish'];

    public height = 200;
    public items: any[];
    public pg_items: any[] = [];
    public resolver = null;
    public restricted = true;
    public selectedIndex = 4;
    public selectedIndex$: Observable<number>;
    public state$ = new BehaviorSubject<string>('data');

    constructor() {
        this._disableResolver = ($event: PipSelectableResolveEvent) => {
            return new Promise<boolean>((resolve, reject) => resolve($event.nextIndex % 2 === 0));
        };
        this.items = this._items;
        this.selectedIndex$ = this.state$.asObservable().pipe(
            switchMap(state => {
                return state === 'create' ? of(0) : this._currentIndex$.asObservable();
            })
        );
        this.finishCreate();
        this.finishCreate();
        this.finishCreate();
        this.finishCreate();
        this.finishCreate();
    }

    public changeDisabled(state) {
        if (!state) {
            this.resolver = null;
        } else {
            this.resolver = this._disableResolver;
        }
    }

    public selected($event) {
        if ($event) { this.selectedIndex = $event.index; }
    }

    public select($event: PipSelectableResolveEmitData) {
        if ($event.value as { id: number, title: string }) {
            const idx = this.pg_items.findIndex(it => it.id === $event.value.id);
            if (idx >= 0) {
                this._currentIndex$.next(idx);
            }
        }
    }

    public setCreateState() {
        this.state$.next('create');
    }

    public finishCreate() {
        this.pg_items.push({
            id: this._lastId++,
            title: sample(this._titles)
        });
        this.state$.next('data');
    }

    public removeItem(item) {
        const idx = this.pg_items.findIndex(it => it.id === item.id);
        if (idx >= 0) {
            this.pg_items.splice(idx, 1);
        }
    }

    public indexLoop() {
        const l = this.pg_items.length;
        const ni = this._currentIndex$.value + 1;
        this._currentIndex$.next(ni >= l ? 0 : ni);
    }

}
