import { createSelector } from '@ngrx/store';
import * as TransactionsSelectors from '../../transactions/store/transactions.selectors';
import * as CategoriesSelectors from '../../categories/store/categories.selectors'; 
import { Transaction } from '../../transactions/store/transactions.state';
import { Category } from '../../categories/store/categories.state';

export interface ExpenseStat {
  categoryId: number; 
  total: number;
  count: number;
  average: number;
  transactions: number;
}

export interface CategoryWithExpense {
  id: string;
  name: string;
  total: number;
  count: number;
  average: number;
}

export const getSafeAmount = (rawAmount: any): number => {
    if (typeof rawAmount === 'number') {
        return rawAmount;
    }
    
    if (rawAmount) {
        try {
            let amountString: string = String(rawAmount);

            amountString = amountString.replace(/,/g, ''); // Uklone se zarezi

            const parts = amountString.split('.'); // Resava se ovaj weird bug sa vise tacaka
            
            // Spajaju se prva dva dela
            if (parts.length > 2) {
                const integerPart = parts[0];
                const decimalPart = parts.slice(1).join(''); 
                amountString = integerPart + '.' + decimalPart; 
            }
        
            const finalNumber = parseFloat(amountString);
            
            if (!isNaN(finalNumber)) {
                return finalNumber;
            }
        } catch (e) {
            // Ako parsiranje ne uspe, vraćamo 0
        }
    }
    return 0;
}

export const selectIncomeTransactions = createSelector(
  TransactionsSelectors.selectAllTransactions,
  (transactions: Transaction[]) =>
    transactions.filter(tx => tx.type?.toUpperCase() === 'INCOME')
);

export const selectExpenseTransactions = createSelector(
  TransactionsSelectors.selectAllTransactions,
  (transactions: Transaction[]) =>
    transactions.filter(tx => tx.type?.toUpperCase() === 'EXPENSE')
);

export const selectTotalIncome = createSelector(
  selectIncomeTransactions,
  (incomeTxs: Transaction[]) =>
    incomeTxs.reduce((sum, tx) => sum + getSafeAmount(tx.amount), 0)
);

export const selectTotalExpense = createSelector(
  selectExpenseTransactions,
  (expenseTxs: Transaction[]) =>
    expenseTxs.reduce((sum, tx) => sum + getSafeAmount(tx.amount), 0)
);

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpense,
  (income, expense) => income - expense
);

export const selectRecentTransactions = createSelector(
  TransactionsSelectors.selectAllTransactions,
  (transactions: Transaction[]) =>
    transactions
      .filter(t => !isNaN(new Date(t.date).getTime()))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
);

// export const selectTopCategories = createSelector(
//   TransactionsSelectors.selectAllTransactions,
//   CategoriesSelectors.selectAllCategories,
//   (transactions, categories) => {
//     const expenseStats = transactions
//       .filter(t => t.type === 'EXPENSE')
//       .reduce((acc, tx) => {
//         const existing = acc.find(a => a.categoryId === tx.categoryId);
//         if (existing) {
//           existing.total += tx.amount;
//           existing.count++;
//         } else {
//           acc.push({ categoryId: tx.categoryId, total: tx.amount, count: 1 });
//         }
//         return acc;
//       }, [] as Array<{ categoryId: number; total: number; count: number }>);

//     return expenseStats
//       .map(item => ({
//         ...item,
//         name: categories.find(c => Number(c.id) === item.categoryId)?.name || 'Unknown',
//       }))
//       .sort((a, b) => b.total - a.total)
//       .slice(0, 5);
//   }
// );

// export const selectMonthlyStats = createSelector(
//   TransactionsSelectors.selectAllTransactions,
//   (transactions) => {
//     const monthlyData = transactions.reduce((acc, tx) => {
//       const date = new Date(tx.date);
//       const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

//       if (!acc[monthKey]) {
//         acc[monthKey] = { month: monthKey, income: 0, expense: 0, transactions: 0 };
//       }

//       if (tx.type === 'INCOME') acc[monthKey].income += tx.amount;
//       else acc[monthKey].expense += tx.amount;

//       acc[monthKey].transactions++;

//       return acc;
//     }, {} as Record<string, { month: string; income: number; expense: number; transactions: number }>);

//     return Object.values(monthlyData)
//       .sort((a, b) => b.month.localeCompare(a.month))
//       .slice(0, 12)
//       .map(m => ({
//         ...m,
//         balance: m.income - m.expense,
//       }));
//   }
// );

// export const selectCategoriesWithExpenses = createSelector(
//   CategoriesSelectors.selectAllCategories,
//   TransactionsSelectors.selectAllTransactions,
//   (categories, transactions) => {
//     return categories.map(category => {
//       const related = transactions.filter(tx => tx.categoryId === Number(category.id) && tx.type === 'EXPENSE');
//       const total = related.reduce((sum, tx) => sum + tx.amount, 0);
//       const count = related.length;
//       return {
//         id: category.id,
//         name: category.name,
//         total,
//         count,
//         average: count ? total / count : 0,
//       };
//     });
//   }
// );

export const selectMonthlyStats = createSelector(
  TransactionsSelectors.selectAllTransactions,
  (transactions) => {
    const monthlyData = transactions.reduce((acc, tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, income: 0, expense: 0, transactions: 0 };
      }

      // Koristi getSafeAmount umesto tx.amount direktno
      const safeAmount = getSafeAmount(tx.amount);

      if (tx.type === 'INCOME') {
        acc[monthKey].income += safeAmount;
      } else {
        acc[monthKey].expense += safeAmount;
      }

      acc[monthKey].transactions++;

      return acc;
    }, {} as Record<string, { month: string; income: number; expense: number; transactions: number }>);

    return Object.values(monthlyData)
      .sort((a, b) => b.month.localeCompare(a.month))
      .slice(0, 12)
      .map(m => ({
        ...m,
        balance: m.income - m.expense,
      }));
  }
);

export const selectCategoriesWithExpenses = createSelector(
  CategoriesSelectors.selectAllCategories,
  TransactionsSelectors.selectAllTransactions,
  (categories, transactions) => {
    return categories.map(category => {
      const related = transactions.filter(tx => tx.categoryId === Number(category.id) && tx.type === 'EXPENSE');
      const total = related.reduce((sum, tx) => sum + getSafeAmount(tx.amount), 0);
      const count = related.length;
      
      return {
        id: category.id,
        name: category.name,
        total,
        count,
        average: count ? total / count : 0,
      };
    });
  }
);

export const selectTopCategories = createSelector(
  TransactionsSelectors.selectAllTransactions,
  CategoriesSelectors.selectAllCategories,
  (transactions, categories) => {
    const expenseStats = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, tx) => {
        const existing = acc.find(a => a.categoryId === tx.categoryId);
        const safeAmount = getSafeAmount(tx.amount);
        
        if (existing) {
          existing.total += safeAmount;
          existing.count++;
        } else {
          acc.push({ categoryId: tx.categoryId, total: safeAmount, count: 1 });
        }
        return acc;
      }, [] as Array<{ categoryId: number; total: number; count: number }>);

    return expenseStats
      .map(item => ({
        ...item,
        name: categories.find(c => Number(c.id) === item.categoryId)?.name || 'Unknown',
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }
)
