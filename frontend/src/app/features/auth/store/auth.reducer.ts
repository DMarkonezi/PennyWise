import { createReducer, on } from '@ngrx/store';
import { AuthState, User } from './auth.models';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
// };

export const authReducer = createReducer(
  initialState,

  // LOGIN
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    token: user.token,
    loading: false,
    isAuthenticated: true,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
  })),

  // REGISTER
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    token: user.token,
    loading: false,
    isAuthenticated: true,
    error: null,
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
  })),

  // LOGOUT
  on(AuthActions.logout, () => initialState)
);