import { Component, Injector } from '@angular/core';
import { EditReportGenerated } from './edit-report-generated.component';

@Component({
  selector: 'edit-report',
  templateUrl: './edit-report.component.html'
})
export class EditReportComponent extends EditReportGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
