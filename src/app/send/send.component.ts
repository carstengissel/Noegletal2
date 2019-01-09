import { Component, Injector } from '@angular/core';
import { SendGenerated } from './send-generated.component';

@Component({
  selector: 'send',
  templateUrl: './send.component.html'
})
export class SendComponent extends SendGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
