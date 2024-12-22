import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { CategoriesComponent } from './categories/categories.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NavComponent,FooterComponent,CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(){}
 
}
