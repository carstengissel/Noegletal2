import { Component, Injector } from '@angular/core';
import { DummyGenerated } from './dummy-generated.component';

@Component({
  selector: 'page-dummy',
  templateUrl: './dummy.component.html'
})
export class DummyComponent extends DummyGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
