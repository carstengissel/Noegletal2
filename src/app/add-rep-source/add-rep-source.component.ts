import { Component, Injector } from '@angular/core';
import { AddRepSourceGenerated } from './add-rep-source-generated.component';

@Component({
  selector: 'add-rep-source',
  templateUrl: './add-rep-source.component.html'
})
export class AddRepSourceComponent extends AddRepSourceGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
