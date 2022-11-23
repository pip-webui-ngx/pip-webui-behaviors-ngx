import { NavigationExtras } from '@angular/router';
import { ExtendedKeyboardEvent } from 'mousetrap';

export enum KeyboardEventType {
    Keydown = 'keydown',
    Keyup = 'keyup',
    Keypress = 'keypress'
}

export class HotkeyOptions {
    Type: KeyboardEventType;
    Propagate: boolean;
    DisableInInput: boolean;
    Target: any; // Event target object
}

export class HotkeyItem {
    // Shortcut combination
    public hotkey: string | string[];
    // Target object
    public target?: any;
    // Target element by Id
    public targetId?: string;
    // Access function
    public access?: (event?: ExtendedKeyboardEvent) => boolean;
    // Window.location.href
    public href?: string;
    // router.navigate(command, extras)
    public navigationCommand?: string | string[];
    // Parameters router.navigate(command, extras)
    public navigationExtras?: NavigationExtras;
    // Click callback
    public action?: (event?: ExtendedKeyboardEvent) => void;
    // Default options
    public options?: HotkeyOptions;
}
