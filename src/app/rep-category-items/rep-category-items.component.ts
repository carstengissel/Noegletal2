import { Component, Injector } from '@angular/core';
import { RepCategoryItemsGenerated } from './rep-category-items-generated.component';

@Component({
  selector: 'rep-category-items',
  templateUrl: './rep-category-items.component.html'
})
export class RepCategoryItemsComponent extends RepCategoryItemsGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
