import { Routes } from '@angular/router'; 
import { MainLayoutComponent } from './features/layout/components/main-layout/main-layout'; 
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', loadComponent: () => import('./features/auth/components/login/login').then(m => m.Login), 
  }, 
  { 
    path: 'register', loadComponent: () => import('./features/auth/components/register/register').then(m => m.Register), 
  }, 
  { 
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: 
    [ 
      { 
        path: 'overview', loadComponent: () => import('./features/overview/overview').then(m => m.OverviewComponent), 
      }, 
      { 
        path: 'transactions', loadComponent: () => import('./features/transactions/transactions').then(m => m.TransactionsComponent), 
      }, 
      { 
        path: 'categories', loadComponent: () => import('./features/categories/categories').then(m => m.CategoriesComponent), 
      }, 
      // { 
      //   path: 'budgets', loadComponent: () => import('./features/budgets/pages/budgets-list/budgets-list').then(m => m.BudgetsListComponent), 
      // }, 
      // { 
      //   path: 'recurring-transactions', loadComponent: () => import('./features/recurring-transactions/pages/recurring-transactions-list/recurring-transactions-list').then(m => m.RecurringTransactionsListComponent), 
      // }, 
      // { 
      //   path: '', redirectTo: 'overview', pathMatch: 'full', 
      // },
    ], 
    }, 
    { path: '**', redirectTo: 'overview', }, 
  ];
