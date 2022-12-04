import { Component, HostBinding, Injector, SkipSelf } from '@angular/core';
import { PipHotkeysService } from 'pip-webui-behaviors-ngx';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-hotkeys-example',
  templateUrl: './hotkeys-example.component.html',
  styleUrls: ['./hotkeys-example.component.scss'],
  providers: [PipHotkeysService],
})
export class HotkeysExampleComponent {
  public raisedBg = false;
  public raisedFg = false;

  @HostBinding('class.pip-hotkeys-example') klass = true;

  constructor(
    private pipHotkeys: PipHotkeysService,
    private mainService: MainService,
    @SkipSelf() private injector: Injector,
  ) {
    this.mainService.breadcrumbs = [this.mainService.breadcrumbs[0], { title: 'examples.hotkeys.title' }];

    this.pipHotkeys.add({
      hotkey: 'alt+ h',
      action: () => {
        this.raisedBg = !this.raisedBg;
      },
    });
    this.pipHotkeys.add({
      hotkey: 'alt+h',
      action: () => {
        console.log("shouldn't exist");
      },
    });
    this.pipHotkeys.add({
      hotkey: 'alt+.',
      action: () => {
        this.raisedFg = !this.raisedFg;
      },
    });
    const globalPipHotkeys: PipHotkeysService = this.injector.get(PipHotkeysService);
    globalPipHotkeys.remove('ctrl+alt+f');
    globalPipHotkeys.add({
      hotkey: 'ctrl+alt+f',
      navigationCommand: ['selected'],
    });
  }
}
