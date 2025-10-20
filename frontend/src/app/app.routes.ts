// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Overview } from './features/overview/overview';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',  // ← Prvo ide na login!
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'overview',
    component: Overview
    // TODO: Dodaćemo AuthGuard kasnije
  }
];