import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HOTKEYS_DEFAULT_OPTIONS, HotkeyOptions } from 'pip-webui2-behaviors';

import { HotkeysExampleComponent } from './hotkeys-example.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [HotkeysExampleComponent],
    providers: [
        {
            provide: HOTKEYS_DEFAULT_OPTIONS,
            useValue: <HotkeyOptions>{
                DisableInInput: true
            }
        }
    ]
})
export class HotkeysExampleModule { }
