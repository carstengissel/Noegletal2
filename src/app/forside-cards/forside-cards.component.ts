import { Component, Injector } from '@angular/core';
import { ForsideCardsGenerated } from './forside-cards-generated.component';

@Component({
  selector: 'page-forside-cards',
  templateUrl: './forside-cards.component.html'
})
export class ForsideCardsComponent extends ForsideCardsGenerated {
  constructor(injector: Injector) {
    super(injector);
  }

}
