import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
// import * as TransactionActions from '../../store/transactions.actions';
import * as CategoriesSelectors from '../../../categories/store/categories.selectors';
import * as CategoriesActions from '../../../categories/store/categories.actions';
import * as AuthSelectors from '../../../auth/store/auth.selectors';
import { filter, firstValueFrom, take } from 'rxjs'; 

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.html', 
  styleUrl: './transaction-form.css',
})
export class TransactionFormComponent implements OnInit {
  private store = inject(Store);
  
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  // Form attribues
  amount: number | null = null;
  description: string = '';
  categoryId: number | null = null;
  type: 'INCOME' | 'EXPENSE' = 'EXPENSE';
  date: string = new Date().toISOString().split('T')[0];

  availableCategories$ = this.store.select(CategoriesSelectors.selectAllCategories);
  currentUser$ = this.store.select(AuthSelectors.selectUser);

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategories());
  }

  async onSubmit(): Promise<void> {
    // console.log('1. Form Submit Started');

    if (!this.amount || !this.categoryId) {
        console.error('Validation failed: Amount and Category are required'); 
        return;
    }

    try {
        const authState = await firstValueFrom(
            this.currentUser$.pipe(
                take(1) 
            )
        );

        // console.log('2a. Auth State received:', authState); // Logujemo ceo state

        const user = authState ? authState.user : null;
        
        if (!user || !user.id) {
            console.error('2b. User is NULL or missing ID. Cannot proceed.'); 
            throw new Error('User not authenticated or missing ID.'); 
        }

        // console.log('2c. Valid User found (ID:', user.id, '), preparing data.');

        const transactionToCreate = {
            amount: this.amount,
            description: this.description,
            categoryId: this.categoryId,
            type: this.type,
            date: new Date(this.date),
            userId: user.id, 
        };

        this.save.emit(transactionToCreate);
        console.log('3. Data emitted to parent (using real ID).');
        this.resetForm();

    } catch (error) {
        console.error('4. Fatal Error: Cannot retrieve user from Store.', error);
        this.resetForm();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancel.emit(); 
  }

  private resetForm(): void {
    this.amount = null;
    this.description = '';
    this.categoryId = null;
    this.type = 'EXPENSE';
    this.date = new Date().toISOString().split('T')[0];
  }
}