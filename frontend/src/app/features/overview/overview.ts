import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest, Subject, merge } from 'rxjs';
import { map, takeUntil, filter, startWith } from 'rxjs/operators';
import * as TransactionsSelectors from '../transactions/store/transactions.selectors';
import * as TransactionsActions from '../transactions/store/transactions.actions';
import * as CategoriesActions from '../categories/store/categories.actions';
import * as OverviewSelectors from '../overview/store/overview.selectors';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class OverviewComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  financialSummary$ = combineLatest([
    this.store.select(OverviewSelectors.selectTotalIncome),
    this.store.select(OverviewSelectors.selectTotalExpense),
    this.store.select(OverviewSelectors.selectBalance)
    ]).pipe(
      map(([income, expense, balance]) => ({ income, expense, balance })),
      takeUntil(this.destroy$)
    );

  incomeTransactions$ = this.store.select(TransactionsSelectors.selectAllTransactions).pipe(
    map(transactions => transactions.filter(tx => tx.type === 'INCOME')),
    startWith([])
  );

  expenseTransactions$ = this.store.select(TransactionsSelectors.selectAllTransactions).pipe(
    map(transactions => transactions.filter(tx => tx.type === 'EXPENSE')),
    startWith([])
  );

  topCategories$ = this.store.select(OverviewSelectors.selectTopCategories);
  categoriesWithExpenses$ = this.store.select(OverviewSelectors.selectCategoriesWithExpenses);
  recentTransactions$ = this.store.select(OverviewSelectors.selectRecentTransactions);
  monthlyStats$ = this.store.select(OverviewSelectors.selectMonthlyStats);

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategories());
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}