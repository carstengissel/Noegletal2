import { Component, Injector } from '@angular/core';
import { EditRepCategoryGenerated } from './edit-rep-category-generated.component';

@Component({
  selector: 'edit-rep-category',
  templateUrl: './edit-rep-category.component.html'
})
export class EditRepCategoryComponent extends EditRepCategoryGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
