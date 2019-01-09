import { Component, Injector } from '@angular/core';
import { TestSideGenerated } from './test-side-generated.component';

@Component({
  selector: 'test-side',
  templateUrl: './test-side.component.html'
})
export class TestSideComponent extends TestSideGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
