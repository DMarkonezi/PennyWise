import { createAction, props } from '@ngrx/store'
import { User, LoginRequest, RegisterRequest } from './auth.models';

// LOGIN actions
export const login = createAction(
  '[Auth/Login Page] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

// REGISTER actions
export const register = createAction(
  '[Auth/Register Page] Register',
  props<{ credentials: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth/API] Register Failure',
  props<{ error: string }>()
);

// LOGOUT actios
export const logout = createAction(
  '[Auth] Logout'
);