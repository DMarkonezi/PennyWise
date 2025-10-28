import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as AuthSelectors from '../../../auth/store/auth.selectors';
import * as AuthActions from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent {
  pageTitle = "Overview";
  userInitial = "U";
}

// export class TopbarComponent implements OnInit {
//   user$ : any;
//   userInitial = 'U';
//   pageTitle = 'Dashboard';

//   constructor(
//     private store: Store,
//     private router: Router
//   ) {
//      this.user$ = this.store.select(AuthSelectors.selectUser);
//   }

//   ngOnInit(): void {
//     this.user$.subscribe((user) => {
//       if (user) {
//         this.userInitial = user.email ? user.email[0].toUpperCase() : 'U';
//       }
//     });
//   }

//   onLogout(): void {
//     this.store.dispatch(AuthActions.logout());
//   }
// }