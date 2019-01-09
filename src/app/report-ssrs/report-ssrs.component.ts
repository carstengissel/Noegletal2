import { Component, Injector } from '@angular/core';
import { ReportSsrsGenerated } from './report-ssrs-generated.component';
import {ReportService} from "../powerbi-report/report.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'page-report-ssrs',
  templateUrl: './report-ssrs.component.html'
})
export class ReportSsrsComponent extends ReportSsrsGenerated {

  constructor(injector: Injector, reportService: ReportService, sanitizer: DomSanitizer) {
    super(injector, reportService, sanitizer);
        if(this.parameters != undefined) //this.parameters.reportid != undefined) {
    {
        //this.ssrsviewer0.reportName = this.parameters.reportid;
    }

  }


}
