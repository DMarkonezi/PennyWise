import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TransactionsService } from '../services/transactions.service';
import * as TransactionsActions from './transactions.actions';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private transactionsService = inject(TransactionsService);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(() =>
        this.transactionsService.getTransactions().pipe(
          map(transactions =>
            TransactionsActions.loadTransactionsSuccess({ transactions })
          ),
          catchError(error =>
            of(TransactionsActions.loadTransactionsFailure({ error }))
          )
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.addTransaction),
      switchMap(({ transaction }) =>
        this.transactionsService.addTransaction(transaction).pipe(
          map(newTransaction =>
            TransactionsActions.addTransactionSuccess({ transaction: newTransaction })
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
}