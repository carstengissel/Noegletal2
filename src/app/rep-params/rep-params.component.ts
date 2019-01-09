import { Component, Injector } from '@angular/core';
import { RepParamsGenerated } from './rep-params-generated.component';

@Component({
  selector: 'rep-params',
  templateUrl: './rep-params.component.html'
})
export class RepParamsComponent extends RepParamsGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
