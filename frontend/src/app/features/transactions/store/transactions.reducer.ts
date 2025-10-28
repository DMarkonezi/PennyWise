import { createReducer, on } from '@ngrx/store';
import { initialTransactionsState, transactionAdapter } from './transactions.state';
import * as TransactionsActions from './transactions.actions';

export const transactionsReducer = createReducer(
  initialTransactionsState,

  // LOAD
  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) =>
    transactionAdapter.setAll(transactions, {
      ...state,
      isLoading: false,
    })
  ),

  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // ADD
  on(TransactionsActions.addTransaction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TransactionsActions.addTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.addOne(transaction, {
      ...state,
      isLoading: false,
      isFormOpen: false,
    })
  ),

  on(TransactionsActions.addTransactionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // DELETE
  on(TransactionsActions.deleteTransaction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TransactionsActions.deleteTransactionSuccess, (state, { id }) =>
    transactionAdapter.removeOne(id, {
      ...state,
      isLoading: false,
    })
  ),

  on(TransactionsActions.deleteTransactionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // MODAL
  on(TransactionsActions.openTransactionForm, (state) => ({
    ...state,
    isFormOpen: true,
  })),

  on(TransactionsActions.closeTransactionForm, (state) => ({
    ...state,
    isFormOpen: false,
  }))
);