import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CategoriesActions from './store/categories.actions';
import * as CategoriesSelectors from './store/categories.selectors';
import { CategoryCardComponent } from './components/category-card/category-card';
import { CategoryFormComponent } from './components/category-form/category-form';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent, CategoryFormComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent implements OnInit {
  private store = inject(Store);

  // Selektori iz store-a
  categories$ = this.store.select(CategoriesSelectors.selectAllCategories);
  loading$ = this.store.select(CategoriesSelectors.selectCategoriesLoading);
  error$ = this.store.select(CategoriesSelectors.selectCategoriesError);
  isFormOpen$ = this.store.select(CategoriesSelectors.selectIsFormOpen);

  ngOnInit() {
    this.store.dispatch(CategoriesActions.loadCategories());
  }

  openForm() {
    this.store.dispatch(CategoriesActions.openCategoryForm());
  }

  closeForm() {
    this.store.dispatch(CategoriesActions.closeCategoryForm());
  }

  addCategory(category: any) {
    this.store.dispatch(CategoriesActions.addCategory({ category }));
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure?')) {
      // Ako budeš imao delete u backendu, ovde se poziva
      // this.store.dispatch(CategoriesActions.deleteCategory({ id }));
      console.log('Deleting category:', id);
    }
  }
}
