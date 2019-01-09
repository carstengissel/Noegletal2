import { Component, Injector } from '@angular/core';
import { RepSourcesGenerated } from './rep-sources-generated.component';

@Component({
  selector: 'rep-sources',
  templateUrl: './rep-sources.component.html'
})
export class RepSourcesComponent extends RepSourcesGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
