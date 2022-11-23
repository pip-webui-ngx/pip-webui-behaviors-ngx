import { Injectable, OnDestroy, InjectionToken, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import * as Mousetrap from 'mousetrap';
import { ExtendedKeyboardEvent, MousetrapInstance } from 'mousetrap';

import { HotkeyItem, HotkeyOptions, KeyboardEventType } from './models';

export const HOTKEYS_DEFAULT_OPTIONS = new InjectionToken<HotkeyOptions>('Hotkeys default options');

export const hotkeysDefaultProvider = {
    provide: HOTKEYS_DEFAULT_OPTIONS,
    useValue: {
        Type: KeyboardEventType.Keydown,
        Propagate: false,
        DisableInInput: false,
        Target: document
    }
};

@Injectable()
export class PipHotkeysService implements OnDestroy {

    private _defaultOptions: HotkeyOptions = {
        Type: KeyboardEventType.Keydown,
        Propagate: false,
        DisableInInput: false,
        Target: document
    };
    private _mti: { [element: string]: MousetrapInstance } = {};
    private _registeredHotkeys: string[] = [];

    constructor(
        @Optional() @Inject(HOTKEYS_DEFAULT_OPTIONS) options: HotkeyOptions,
        private router: Router
    ) {
        if (options) {
            this._defaultOptions = Object.assign(this._defaultOptions, options);
        }
    }

    ngOnDestroy() {
        for (const key of Object.keys(this._mti)) {
            if (!this._mti.hasOwnProperty(key)) { continue; }
            this._mti[key].reset();
        }
    }

    private _createInstance(element: Element): MousetrapInstance {
        this._mti[element.nodeName] = new Mousetrap(element);
        this._mti[element.nodeName].stopCallback = () => false;
        return this._mti[element.nodeName];
    }

    private _hasInstance(element: Element): boolean {
        return Object.keys(this._mti).includes(element.nodeName);
    }

    private _getInstance(element: Element): MousetrapInstance {
        return this._mti[element.nodeName] || null;
    }

    private _hasHotkey(hotkey: string | string[]) {
        return Array.isArray(hotkey)
            ? this._registeredHotkeys.filter(h => hotkey.includes(h)).length > 0
            : this._registeredHotkeys.includes(hotkey);
    }

    public add(items: HotkeyItem | HotkeyItem[]) {
        if (!Array.isArray(items)) { items = [items]; }
        for (const item of items) {
            const hotkeys = [];
            for (const h of Array.isArray(item.hotkey) ? cloneDeep(item.hotkey) : [item.hotkey]) {
                hotkeys.push(h.toLowerCase().replace(/\s/g, ''));
            }
            if (this._hasHotkey(hotkeys)) { return; }
            const options: HotkeyOptions = item.options
                ? Object.assign(item.options, cloneDeep(this._defaultOptions))
                : cloneDeep(this._defaultOptions);
            let element: Element;
            if (item.target) {
                element = item.target;
            } else if (item.targetId) {
                element = document.getElementById(item.targetId);
            } else if (typeof options.Target === 'string') {
                element = document.getElementById(options.Target);
            } else {
                element = options.Target;
            }
            if (!element) { return; }
            const mt = this._hasInstance(element) ? this._getInstance(element) : this._createInstance(element);
            this._registeredHotkeys.push(...hotkeys);
            mt.bind(hotkeys, (event?: ExtendedKeyboardEvent) => {
                const el = element as HTMLElement;
                if (options.DisableInInput && el.contentEditable && el.contentEditable === 'true') {
                    return;
                }
                if (!options.Propagate) {
                    event.cancelBubble = true;
                    event.returnValue = true;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
                if (item.access && typeof item.access === 'function') {
                    if (!item.access(event)) {
                        return;
                    }
                }
                if (item.action) {
                    item.action(event);
                    return;
                }
                if (item.href) {
                    window.location.href = item.href;
                    return;
                }
                if (item.navigationCommand) {
                    this.router.navigate(
                        Array.isArray(item.navigationCommand) ? item.navigationCommand : [item.navigationCommand],
                        item.navigationExtras
                    );
                    return;
                }
            }, options.Type);
        }
    }

    public remove(hotkey: string | string[], type: KeyboardEventType = KeyboardEventType.Keydown) {
        const hotkeys = [];
        for (const h of Array.isArray(hotkey) ? cloneDeep(hotkey) : [hotkey]) {
            hotkeys.push(h.toLowerCase().replace(/\s/g, ''));
        }
        for (const key of Object.keys(this._mti)) {
            if (!this._mti.hasOwnProperty(key)) { continue; }
            this._mti[key].unbind(hotkey, type);
        }
        for (const k of hotkeys) {
            const idx = this._registeredHotkeys.findIndex(key => key === k);
            if (idx < 0) { continue; }
            this._registeredHotkeys.splice(idx, 1);
        }
    }
}
