import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => {
    console.log('LOGIN EFFECT KREIIRAN');
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) => {
        console.log('LOGIN ACTION PRIMLJEN', credentials);
        return this.authService.login(credentials).pipe(
          map((user) => {
            console.log('LOGIN USPEŠAN', user);
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            console.log('LOGIN GREŠKA', error);
            return of(AuthActions.loginFailure({ error: error.error?.message || 'Login failed' }));
          })
        );
      })
    );
  });

  loginSuccess$ = createEffect(
    () => {
      console.log('LOGIN SUCCESS EFFECT KREIRAN');
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          console.log('REDIREKCIJA NA OVERVIEW', action);
          this.router.navigate(['/overview']);
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    console.log('REGISTER EFFECT KREIRAN');
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ credentials }) => {
        console.log('REGISTER ACTION PRIMLJEN', credentials);
        return this.authService.register(credentials).pipe(
          map((user) => {
            console.log('REGISTER USPEŠAN', user);
            return AuthActions.registerSuccess({ user });
          }),
          catchError((error) => {
            console.log('REGISTER GREŠKA', error);
            return of(AuthActions.registerFailure({ error: error.error?.message || 'Registration failed' }));
          })
        );
      })
    );
  });

  registerSuccess$ = createEffect(
    () => {
      console.log('REGISTER SUCCESS EFFECT KREIRAN');
      return this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap((action) => {
          console.log('REDIREKCIJA NA OVERVIEW', action);
          this.router.navigate(['/overview']);
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      console.log('LOGOUT EFFECT KREIRAN');
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          console.log('REDIREKCIJA NA LOGIN');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );
}