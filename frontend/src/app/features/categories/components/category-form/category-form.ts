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
  type: 'income' | 'expense' = 'expense'; // Vrednost koja se vezuje za Select

  constructor(private store: Store<CategoriesState>) {} 

  onSubmit(): void {
  
    // 1. Priprema podataka
    const categoryToCreate = {
        name: this.name,
        color: this.color,
        type: this.type.toUpperCase() as 'INCOME' | 'EXPENSE', 
        isDefault: false, 
    };

    // 2. DISPEČOVANJE NgRx AKCIJE za čuvanje
    this.store.dispatch(
        CategoriesActions.addCategory({ category: categoryToCreate })
    );

    // 3. Resetovanje forme (brišemo vrednosti)
    this.name = '';
    this.color = '#000000';
    this.type = 'expense';

    // 4. Dispečovanje UI akcije za zatvaranje modala/forme
    this.store.dispatch(CategoriesActions.closeCategoryForm());
  }

  onCancel(): void {
    // Dispečovanje akcije za zatvaranje
    this.store.dispatch(CategoriesActions.closeCategoryForm());
    // Resetovanje (opciono)
    this.name = '';
    this.color = '#000000';
    this.type = 'expense';
  }
}