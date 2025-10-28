import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface Transaction {
  id: number; 
  userId: number; 
  amount: number;
  description: string;
  categoryId: number;
  date: Date;
  type: 'INCOME' | 'EXPENSE'; // For frontend logic
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


// export interface Transaction {
//   id: string;
//   amount: number;
//   description: string;
//   date: Date;
//   userId: number;
//   categoryId: number;
//   recurringTransactionId: number | null;
// }

// export interface TransactionsState {
//   transactions: Transaction[];
//   loading: boolean;
//   error: string | null;
//   selectedTransaction: Transaction | null;
//   isFormOpen: boolean;  
// }

// export const initialState: TransactionsState = {
//   transactions: [],
//   loading: false,
//   error: null,
//   selectedTransaction: null,
//   isFormOpen: false,
// };