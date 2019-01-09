import { Component, Injector } from '@angular/core';
import { EditRepCategoryItemGenerated } from './edit-rep-category-item-generated.component';

@Component({
  selector: 'edit-rep-category-item',
  templateUrl: './edit-rep-category-item.component.html'
})
export class EditRepCategoryItemComponent extends EditRepCategoryItemGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
