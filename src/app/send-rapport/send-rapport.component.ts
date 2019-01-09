import { Component, Injector } from '@angular/core';
import { SendRapportGenerated } from './send-rapport-generated.component';
import {NoegleTalReport} from "../noegle-tal.model";


@Component({
  selector: 'page-send-rapport',
  templateUrl: './send-rapport.component.html'
})
export class SendRapportComponent extends SendRapportGenerated {

    selectedReport: NoegleTalReport;

    constructor(injector: Injector) {
    super(injector);
  }

    load() {
      super.load();

    }
}



