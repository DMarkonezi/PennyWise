import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as AuthSelectors from '../../../auth/store/auth.selectors';
import * as AuthActions from '../../../auth/store/auth.actions';
import { User } from '../../../auth/store/auth.models';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent {
  @Input() user: User | undefined;

  private store = inject(Store);

  onLogout(): void {
    if (confirm('Are you sure?')) {
      this.store.dispatch(AuthActions.logout());
    }
  }

}