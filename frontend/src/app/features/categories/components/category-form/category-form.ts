import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store'; 
import * as CategoriesActions from '../../store/categories.actions'
import { CategoriesState } from '../../store/categories.state';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryFormComponent {  
  name: string = '';
  color: string = '#000000';
  type: 'income' | 'expense' = 'expense';

  constructor(private store: Store<CategoriesState>) {} 

  onSubmit(): void {
    const categoryToCreate = {
        name: this.name,
        color: this.color,
        type: this.type.toUpperCase() as 'INCOME' | 'EXPENSE', 
        isDefault: false, 
    };

    this.store.dispatch(
        CategoriesActions.addCategory({ category: categoryToCreate })
    );

    this.name = '';
    this.color = '#000000';
    this.type = 'expense';

    this.store.dispatch(CategoriesActions.closeCategoryForm());
  }

  onCancel(): void {
    this.store.dispatch(CategoriesActions.closeCategoryForm());
    this.name = '';
    this.color = '#000000';
    this.type = 'expense';
  }
}