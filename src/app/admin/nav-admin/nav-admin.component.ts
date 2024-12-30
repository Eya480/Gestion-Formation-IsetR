import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css'
})
export class NavAdminComponent {
  logo="isetR";
}
