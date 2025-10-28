import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import * as AuthSelectors from '../../features/auth/store/auth.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(AuthSelectors.selectToken).pipe(
    take(1),
    switchMap(token => {
      if (token && !req.url.includes('auth')) {
        // Zahtev se klonira i dodajese 'Bearer' token
        const authorizedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authorizedReq); 
      }
      return next(req);
    })
  );
};
