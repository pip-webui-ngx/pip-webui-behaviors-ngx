import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { HOTKEYS_DEFAULT_OPTIONS, HotkeyOptions } from 'pip-webui-behaviors-ngx';

import { HotkeysExampleComponent } from './hotkeys-example.component';

@NgModule({
  imports: [CommonModule, TranslocoModule],
  declarations: [HotkeysExampleComponent],
  providers: [
    {
      provide: HOTKEYS_DEFAULT_OPTIONS,
      useValue: <HotkeyOptions>{
        DisableInInput: true,
      },
    },
  ],
})
export class HotkeysExampleModule {}
