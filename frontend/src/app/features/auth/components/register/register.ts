import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import * as AuthSelectors from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeToTerms = false;
  loading$ : any;
  error$ : any;

  constructor(
    private store: Store,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(AuthSelectors.selectLoading);
    this.error$ = this.store.select(AuthSelectors.selectError);

    // Ako je već ulogovan, ide na overview
    this.store.select(AuthSelectors.selectIsAuthenticated).subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/overview']);
      }
    });
  }

  onSubmit(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
      alert('Popuni sva polja!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Lozinke se ne poklapaju!');
      return;
    }

    if (this.password.length < 8) {
      alert('Lozinka mora da ima najmanje 8 karaktera!');
      return;
    }

    if (!this.agreeToTerms) {
      alert('Morate da prihvatite Terms & Conditions!');
      return;
    }

    this.store.dispatch(
      AuthActions.register({
        credentials: {
          firstName: this.firstName,     
          lastName: this.lastName,        
          email: this.email,
          password: this.password,
    }
      })
    );
  }
}