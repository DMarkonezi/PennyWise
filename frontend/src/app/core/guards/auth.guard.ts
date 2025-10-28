// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../features/auth/store/auth.selectors';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private store: Store, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await firstValueFrom(
        this.store.select(AuthSelectors.selectIsAuthenticated)
    );

    if (isAuthenticated) {
        return true; 
    } else {
        this.router.navigate(['/login']); 
        return false; 
    }
  }
}