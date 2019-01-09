import { Component, Injector } from '@angular/core';
import { EditRepParamGenerated } from './edit-rep-param-generated.component';

@Component({
  selector: 'edit-rep-param',
  templateUrl: './edit-rep-param.component.html'
})
export class EditRepParamComponent extends EditRepParamGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
