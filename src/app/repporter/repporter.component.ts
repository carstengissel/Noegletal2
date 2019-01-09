import { Component, Injector } from '@angular/core';
import { RepporterGenerated } from './repporter-generated.component';

@Component({
  selector: 'repporter',
  templateUrl: './repporter.component.html'
})
export class RepporterComponent extends RepporterGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
