import { Component, inject, Inject, OnDestroy, OnInit } from "@angular/core";
import { TopbarComponent } from "../topbar/topbar";
import { SidebarComponent } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../auth/store/auth.selectors";
import { distinctUntilChanged, filter, Subject, takeUntil, tap } from "rxjs";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, TopbarComponent, SidebarComponent],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.css',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private destroy$ = new Subject<void>();
    
    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}