import { Component, Injector } from '@angular/core';
import { AddRepParamGenerated } from './add-rep-param-generated.component';

@Component({
  selector: 'add-rep-param',
  templateUrl: './add-rep-param.component.html'
})
export class AddRepParamComponent extends AddRepParamGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
