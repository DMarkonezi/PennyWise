import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { StorageService } from '../../../core/services/storage.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private storageService = inject(StorageService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) => {
        return this.authService.login(credentials).pipe(
          map((user) => {
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({ error: error.error?.message || 'Login failed' }));
          })
        );
      })
    );
  });

  // loginSuccess$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.loginSuccess),
  //       tap((action) => {
  //         this.router.navigate(['/overview']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.storageService.setItem('token', action.user.token);
          this.storageService.setItem('user', JSON.stringify(action.user));
          this.router.navigate(['/overview']);
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ credentials }) => {
        return this.authService.register(credentials).pipe(
          map((user) => {
            return AuthActions.registerSuccess({ user });
          }),
          catchError((error) => {
            return of(AuthActions.registerFailure({ error: error.error?.message || 'Registration failed' }));
          })
        );
      })
    );
  });

  registerSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap((action) => {
          this.router.navigate(['/overview']);
        })
      );
    },
    { dispatch: false }
  );

  // logout$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         this.router.navigate(['/login']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          // Obriši token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  ); 
}