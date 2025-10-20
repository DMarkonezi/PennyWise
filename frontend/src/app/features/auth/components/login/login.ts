import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import * as AuthSelectors from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  loading$ : any;
  error$ : any;
  

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loading$ = this.store.select(AuthSelectors.selectLoading);
    this.error$ = this.store.select(AuthSelectors.selectError);

    // Ako je već ulogovan, idi na overview
    this.store.select(AuthSelectors.selectIsAuthenticated).subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/overview']);
      }
    });
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      alert('Popuni sva polja!');
      return;
    }

    // Dispatch login akciju
    this.store.dispatch(
      AuthActions.login({
        credentials: {
          email: this.email,
          password: this.password,
        },
      })
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}