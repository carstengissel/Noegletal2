import { Component, Injector } from '@angular/core';
import { GemRapportGenerated } from './gem-rapport-generated.component';
import {IReportNoegletal} from "../powerbi-report/report";

@Component({
  selector: 'gem-rapport',
  templateUrl: './gem-rapport.component.html'
})
export class GemRapportComponent extends GemRapportGenerated {
  constructor(injector: Injector) {
    super(injector);
  }

    currentReport: IReportNoegletal;


    onCurrentReport(value: IReportNoegletal): void {
        this.currentReport = value;
    }


    // if (rtgrt) {
    //     if (this.dialogRef) {
    //         this.dialogRef.close();
    //     }
    //     this.router.navigate(['gem-rapport']);
    // }
}
