import { Component, Injector } from '@angular/core';
import { AddRepCategoryGenerated } from './add-rep-category-generated.component';

@Component({
  selector: 'add-rep-category',
  templateUrl: './add-rep-category.component.html'
})
export class AddRepCategoryComponent extends AddRepCategoryGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
