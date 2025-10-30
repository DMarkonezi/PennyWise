import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers } from '../app/core/store/meta-reducer';
// import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { authReducer } from './features/auth/store/auth.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';

import { categoriesReducer } from './features/categories/store/categories.reducer';
import { CategoriesEffects } from './features/categories/store/categories.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { transactionsReducer } from './features/transactions/store/transactions.reducer';
import { TransactionsEffects } from './features/transactions/store/transactions.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    
    // NgRx store
    // provideStore({
    //   auth: authReducer,
    //   categories: categoriesReducer,
    //   transactions: transactionsReducer
    // }),
    provideStore(
      {
        auth: authReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
      },
      { metaReducers }
    ),

    provideEffects([AuthEffects, CategoriesEffects, TransactionsEffects]),
    
    provideStoreDevtools({
      maxAge: 25,
    }),
  ],
};