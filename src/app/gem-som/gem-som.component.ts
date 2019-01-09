import { Component, Injector } from '@angular/core';
import { GemSomGenerated } from './gem-som-generated.component';

@Component({
  selector: 'gem-som',
  templateUrl: './gem-som.component.html'
})
export class GemSomComponent extends GemSomGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
