import { Component, Injector } from '@angular/core';
import { EditRepSourceGenerated } from './edit-rep-source-generated.component';

@Component({
  selector: 'edit-rep-source',
  templateUrl: './edit-rep-source.component.html'
})
export class EditRepSourceComponent extends EditRepSourceGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
