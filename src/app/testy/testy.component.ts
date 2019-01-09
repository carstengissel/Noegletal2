import { Component, Injector } from '@angular/core';
import { TestyGenerated } from './testy-generated.component';

@Component({
  selector: 'page-testy',
  templateUrl: './testy.component.html'
})
export class TestyComponent extends TestyGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
