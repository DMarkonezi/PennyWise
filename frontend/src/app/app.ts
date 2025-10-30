import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as AuthSelectors from './features/auth/store/auth.selectors';
import * as AuthActions from './features/auth/store/auth.actions';

import { MainLayoutComponent } from './features/layout/components/main-layout/main-layout';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pennywise-frontend');
  isAuthPage: boolean = false;
  userInitial: string = 'G';
  userName$ : any;

  constructor(
    private store: Store,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {

    const savedUser = this.storageService.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.store.dispatch(AuthActions.loginSuccess({ user }));
    }

    this.userName$ = this.store.select(AuthSelectors.selectUser);

    // Slusa za rutiranje
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAuthPage = this.checkIfAuthPage(event.url);
    });

    this.isAuthPage = this.checkIfAuthPage(this.router.url);

    this.store.select(AuthSelectors.selectUser).subscribe((user) => {
      if (user) {
        this.userInitial = user.username ? user.username[0].toUpperCase() : 'G';
      }
    });
  }

  private checkIfAuthPage(url: string): boolean {
    const authRoutes = ['/login', '/register'];
    return authRoutes.some(route => url.includes(route));
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}