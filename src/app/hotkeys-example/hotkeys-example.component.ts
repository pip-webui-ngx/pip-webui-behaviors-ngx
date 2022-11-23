import { Component, Injector, SkipSelf } from '@angular/core';
import { PipHotkeysService } from 'pip-webui2-behaviors';

@Component({
    selector: 'app-hotkeys-example',
    templateUrl: './hotkeys-example.component.html',
    styleUrls: ['./hotkeys-example.component.scss'],
    providers: [PipHotkeysService]
})
export class HotkeysExampleComponent {

    public raisedBg = false;
    public raisedFg = false;

    constructor(
        private pipHotkeys: PipHotkeysService,
        @SkipSelf() private injector: Injector
    ) {
        this.pipHotkeys.add({
            hotkey: 'alt+ h',
            action: () => { this.raisedBg = !this.raisedBg; }
        });
        this.pipHotkeys.add({
            hotkey: 'alt+h',
            action: () => { console.log('shouldnt exist'); }
        });
        this.pipHotkeys.add({
            hotkey: 'alt+.',
            action: () => { this.raisedFg = !this.raisedFg; }
          });
        const globalPipHotkeys: PipHotkeysService = this.injector.get(PipHotkeysService);
        globalPipHotkeys.remove('ctrl+alt+f');
        globalPipHotkeys.add({
            hotkey: 'ctrl+alt+f',
            navigationCommand: ['selected']
        });
    }

    public selectedIndex = 4;

}
