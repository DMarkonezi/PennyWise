import { Component } from "@angular/core";
import { TopbarComponent } from "../topbar/topbar";
import { SidebarComponent } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, TopbarComponent, SidebarComponent],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.css',
})
export class MainLayoutComponent {}