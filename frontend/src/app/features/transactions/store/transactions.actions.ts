import { createAction, props } from '@ngrx/store';
import { Transaction } from './transactions.state';

// Load akcije
export const loadTransactions = createAction(
  '[Transactions Page] Load Transactions'
);

export const loadTransactionsSuccess = createAction(
  '[Transactions API] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Transactions API] Load Transactions Failure',
  props<{ error: any }>()
);

// Add akcije
export const addTransaction = createAction(
  '[Transactions Page] Add Transaction',
  props<{ transaction: Omit<Transaction, 'id' | 'createdAt'> }>()
);

export const addTransactionSuccess = createAction(
  '[Transactions API] Add Transaction Success',
  props<{ transaction: Transaction }>()
);

export const addTransactionFailure = createAction(
  '[Transactions API] Add Transaction Failure',
  props<{ error: any }>()
);

// Delete akcije
export const deleteTransaction = createAction(
  '[Transactions Page] Delete Transaction',
  props<{ id: number }>()
);

export const deleteTransactionSuccess = createAction(
  '[Transactions API] Delete Transaction Success',
  props<{ id: number }>()
);

export const deleteTransactionFailure = createAction(
  '[Transactions API] Delete Transaction Failure',
  props<{ error: any }>()
);

// Modal akcije
export const openTransactionForm = createAction(
  '[Transactions Page] Open Form'
);

export const closeTransactionForm = createAction(
  '[Transactions Page] Close Form'
);