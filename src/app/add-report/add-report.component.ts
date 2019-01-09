import { Component, Injector } from '@angular/core';
import { AddReportGenerated } from './add-report-generated.component';

@Component({
  selector: 'add-report',
  templateUrl: './add-report.component.html'
})
export class AddReportComponent extends AddReportGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
