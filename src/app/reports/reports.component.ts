import { Component, Injector } from '@angular/core';
import { ReportsGenerated } from './reports-generated.component';

@Component({
  selector: 'page-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent extends ReportsGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
