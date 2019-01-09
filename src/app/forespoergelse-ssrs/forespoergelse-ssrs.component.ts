import { Component, Injector } from '@angular/core';
import { ForespoergelseSsrsGenerated } from './forespoergelse-ssrs-generated.component';
import {ReportService} from "../powerbi-report/report.service";

@Component({
  selector: 'page-forespoergelse-ssrs',
  templateUrl: './forespoergelse-ssrs.component.html'
})
export class ForespoergelseSsrsComponent extends ForespoergelseSsrsGenerated {
  constructor(injector: Injector, reportService: ReportService) {
    super(injector, reportService);
  }
}
