import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface Transaction {
  id: number; 
  userId: number; 
  amount: number;
  description: string;
  categoryId: number;
  categoryName: string;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  createdAt: Date; 
  recurringTransactionId: number | null; 
}

export const transactionAdapter = createEntityAdapter<Transaction>({
  selectId: (transaction: Transaction) => transaction.id,
  sortComparer: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
});

export interface TransactionsState extends EntityState<Transaction> {
  isLoading: boolean;
  error: any;
  selectedTransactionId: number | null; 
  isFormOpen: boolean; 
}

export const initialTransactionsState: TransactionsState = transactionAdapter.getInitialState({
  isLoading: false,
  error: null,
  selectedTransactionId: null,
  isFormOpen: false,
});