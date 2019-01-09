import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import { ForespoergelseGenerated } from './forespoergelse-generated.component';
//import {Report} from "../noegle-tal.model";

import {ActivatedRoute} from "@angular/router";
import {DIALOG_PARAMETERS} from "@radzen/angular";

interface ngOnInit {
}

@Component({
  selector: 'forespoergelse',
  templateUrl: './forespoergelse.component.html'
})
export class ForespoergelseComponent extends ForespoergelseGenerated { //implements OnInit{
    constructor(injector: Injector) {
        super(injector);

        // this.paramsSub = this.route.queryParams.subscribe(
        //     (params) => {
        //         this.test = params;
        //
        //         //this.pageTitle = (params['pageTitle']);
        //     });
        // var get = this.route.params.subscribe(parameters => {
        //     this.param = parameters;
        // });
    }


    test: any;



    param: any;





}

