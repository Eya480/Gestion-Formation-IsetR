import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './public/footer/footer.component';
import { NavComponent } from './public/nav/nav.component';
import { NavAdminComponent } from "./admin/nav-admin/nav-admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavComponent, NavAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion-Formations-ISET';
  showPublicNavbar = true;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Toggle navbar visibility based on the current route
      this.showPublicNavbar = !this.router.url.startsWith('/admin');
    });
  }
}
