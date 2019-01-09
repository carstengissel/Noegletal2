import { Component, Injector } from '@angular/core';
import { ForsideGenerated } from './forside-generated.component';

@Component({
  selector: 'page-forside',
  templateUrl: './forside.component.html'
})
export class ForsideComponent extends ForsideGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
