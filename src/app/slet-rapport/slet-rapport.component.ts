import { Component, Injector } from '@angular/core';
import { SletRapportGenerated } from './slet-rapport-generated.component';

@Component({
  selector: 'page-slet-rapport',
  templateUrl: './slet-rapport.component.html'
})
export class SletRapportComponent extends SletRapportGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
