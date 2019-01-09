import { Component, Injector } from '@angular/core';
import { RepportKategorierGenerated } from './repport-kategorier-generated.component';

@Component({
  selector: 'repport-kategorier',
  templateUrl: './repport-kategorier.component.html'
})
export class RepportKategorierComponent extends RepportKategorierGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
