import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as TransactionsActions from '../transactions/store/transactions.actions';
import * as TransactionsSelectors from '../transactions/store/transactions.selectors'
import * as OverviewSelectors from '../overview/store/overview.selectors';
import { TransactionFormComponent } from './components/transaction-form/transaction-form';
import { TransactionsListComponent } from './components/transaction-list/transactions-list';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, TransactionFormComponent, TransactionsListComponent],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class TransactionsComponent implements OnInit {
  private store = inject(Store);

  transactions$ = this.store.select(TransactionsSelectors.selectAllTransactions);
  loading$ = this.store.select(TransactionsSelectors.selectTransactionsLoading);
  error$ = this.store.select(TransactionsSelectors.selectTransactionsError);
  isFormOpen$ = this.store.select(TransactionsSelectors.selectIsFormOpen);

  ngOnInit() {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  openForm() {
    this.store.dispatch(TransactionsActions.openTransactionForm());
  }

  closeForm() {
    this.store.dispatch(TransactionsActions.closeTransactionForm());
  }

  addTransaction(formData: any) {
    console.log('Parent Component: Received data from form.', formData);
    
    // this.store.dispatch(TransactionsActions.addTransaction({
    //   transaction: {
    //     userId: 1,
    //     amount: formData.amount,
    //     description: formData.description,
    //     categoryId: formData.categoryId,
    //     date: new Date(formData.date),
    //     type: formData.type,
    //     recurringTransactionId: null,
    //   }
    //}));

    const { type, ...transactionToSend } = formData;
    this.store.dispatch(TransactionsActions.addTransaction({
      transaction: transactionToSend
    }));
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.store.dispatch(TransactionsActions.deleteTransaction({ id }));
    }
  }
}