import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, combineLatest } from 'rxjs';
import { zip } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { TransactionsService } from '../services/transactions.service';
import * as TransactionsActions from './transactions.actions';
import { CategoryService } from '../../categories/services/category.service';
import { Transaction } from './transactions.state';
import { Category } from '../../categories/store/categories.state';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../categories/store/categories.selectors';
import { selectAllTransactions } from './transactions.selectors';


@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private transactionsService = inject(TransactionsService);
  private categoriesService = inject(CategoryService); 

   loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(() => {
        return this.store.select(selectAllTransactions).pipe(
          take(1),
          switchMap(existingTransactions => {
            // Proverava da li su transakcije vec odradjene ucitane u store ili ne
            if (existingTransactions && existingTransactions.length > 0) {
              return of(TransactionsActions.loadTransactionsSuccess({ 
                transactions: existingTransactions 
              }));
            }

            const transactions$ = this.transactionsService.getTransactions();
            const categoriesFromStore$ = this.store.select(selectAllCategories).pipe(take(1));

            return combineLatest([transactions$, categoriesFromStore$]).pipe(
              switchMap(([transactions, categoriesFromStore]) => {
                if (categoriesFromStore && categoriesFromStore.length > 0) {
                  return of({ transactions, categories: categoriesFromStore });
                }
                return this.categoriesService.getCategories().pipe(
                  map(categories => ({ transactions, categories }))
                );
              }),
              map(({ transactions, categories }) => {
                const categoryMap = new Map<string, any>(
                  categories.map(cat => [String(cat.id), cat])
                );

                const transactionsWithCategoryData = transactions.map(tx => ({
                  ...tx,
                  type: categoryMap.get(String(tx.categoryId))?.type || 'EXPENSE',
                  categoryName: categoryMap.get(String(tx.categoryId))?.name || 'Unknown Category',
                }));

                return TransactionsActions.loadTransactionsSuccess({
                  transactions: transactionsWithCategoryData,
                });
              }),
              catchError(error => {
                console.error('ERROR IN TRANSACTIONS EFFECT:', error);
                return of(TransactionsActions.loadTransactionsFailure({ error: error.message }));
              })
            );
          })
        );
      })
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.addTransaction),
      switchMap(({ transaction }) =>
        this.transactionsService.addTransaction(transaction).pipe(
          switchMap(newTransaction =>
            of(TransactionsActions.addTransactionSuccess({ transaction: newTransaction }))
          ),
          catchError(error =>
            of(TransactionsActions.addTransactionFailure({ error }))
          )
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.deleteTransaction),
      switchMap(({ id }) =>
        this.transactionsService.deleteTransaction(id).pipe(
          map(() =>
            TransactionsActions.deleteTransactionSuccess({ id })
          ),
          catchError(error =>
            of(TransactionsActions.deleteTransactionFailure({ error }))
          )
        )
      )
    )
  );

  // loadTransactions$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TransactionsActions.loadTransactions),
  //     switchMap(() => {
  //       // Preuzmi transakcije i kategorije iz store-a
  //       const transactions$ = this.transactionsService.getTransactions();
  //       const categoriesFromStore$ = this.store.select(selectAllCategories).pipe(take(1));

  //       return combineLatest([transactions$, categoriesFromStore$]).pipe(
  //         switchMap(([transactions, categoriesFromStore]) => {
  //           // Ako su kategorije u store-u, koristi ih
  //           if (categoriesFromStore && categoriesFromStore.length > 0) {
  //             return of({ transactions, categories: categoriesFromStore });
  //           }

  //           // Inače učitaj ih iz API-ja
  //           return this.categoriesService.getCategories().pipe(
  //             map(categories => ({ transactions, categories }))
  //           );
  //         }),
  //         map(({ transactions, categories }) => {
  //           console.log('CATEGORIES:', categories);
  //           console.log('RAW TRANSACTIONS:', transactions);

  //           const categoryMap = new Map<string, any>(
  //             categories.map(cat => [String(cat.id), cat])
  //           );

  //           const transactionsWithCategoryData = transactions.map(tx => {
  //             const category = categoryMap.get(String(tx.categoryId));
  //             console.log(`TX ${tx.id}: categoryId=${tx.categoryId}, category=`, category);

  //             return {
  //               ...tx,
  //               type: category?.type || 'EXPENSE',
  //               categoryName: category?.name || 'Unknown Category',
  //             };
  //           });

  //           console.log('FINAL TRANSACTIONS:', transactionsWithCategoryData);

  //           return TransactionsActions.loadTransactionsSuccess({
  //             transactions: transactionsWithCategoryData,
  //           });
  //         }),
  //         catchError(error => {
  //           console.error('ERROR IN TRANSACTIONS EFFECT:', error);
  //           return of(TransactionsActions.loadTransactionsFailure({ error: error.message }));
  //         })
  //       );
  //     })
  //   )
  // );

  // addTransaction$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TransactionsActions.addTransaction),
  //     switchMap(({ transaction }) =>
  //       this.transactionsService.addTransaction(transaction).pipe(
  //         map(newTransaction =>
  //           TransactionsActions.addTransactionSuccess({ transaction: newTransaction })
  //         ),
  //         catchError(error =>
  //           of(TransactionsActions.addTransactionFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // deleteTransaction$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TransactionsActions.deleteTransaction),
  //     switchMap(({ id }) =>
  //       this.transactionsService.deleteTransaction(id).pipe(
  //         map(() =>
  //           TransactionsActions.deleteTransactionSuccess({ id })
  //         ),
  //         catchError(error =>
  //           of(TransactionsActions.deleteTransactionFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );
}