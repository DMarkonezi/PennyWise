import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState, transactionAdapter } from './transactions.state';

export const selectTransactionsState = 
  createFeatureSelector<TransactionsState>('transactions');

// Entity adapter selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = transactionAdapter.getSelectors(selectTransactionsState);

// Custom selectors
export const selectAllTransactions = selectAll;

export const selectTransactionsLoading = createSelector(
  selectTransactionsState,
  (state) => state.isLoading
);

export const selectTransactionsError = createSelector(
  selectTransactionsState,
  (state) => state.error
);

export const selectIsFormOpen = createSelector(
  selectTransactionsState,
  (state) => state.isFormOpen
);

export const selectSelectedTransactionId = createSelector(
  selectTransactionsState,
  (state) => state.selectedTransactionId
);

// Filtrirani selektors
export const selectIncomes = createSelector(
  selectAllTransactions,
  (transactions) => transactions.filter(t => t.type === 'INCOME')
);

export const selectExpenses = createSelector(
  selectAllTransactions,
  (transactions) => transactions.filter(t => t.type === 'EXPENSE')
);

export const selectTotalIncome = createSelector(
  selectIncomes,
  (incomes) => incomes.reduce((sum, t) => sum + t.amount, 0)
);

export const selectTotalExpense = createSelector(
  selectExpenses,
  (expenses) => expenses.reduce((sum, t) => sum + t.amount, 0)
);

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpense,
  (income, expense) => income - expense
);