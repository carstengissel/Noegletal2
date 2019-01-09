import { Component, Injector } from '@angular/core';
import { AddRepCategoryItemGenerated } from './add-rep-category-item-generated.component';

@Component({
  selector: 'add-rep-category-item',
  templateUrl: './add-rep-category-item.component.html'
})
export class AddRepCategoryItemComponent extends AddRepCategoryItemGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
