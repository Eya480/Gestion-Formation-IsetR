import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CategoriesComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  titre: string =
      'Transformez votre avenir avec nos formations inoubliables et dynamiques !';
    description: string =
      "Découvrez nos formations diversifiées adaptées à vos besoins professionnels. Que vous soyez débutant ou expert, nous proposons des parcours conçus pour vous aider à atteindre vos objectifs dans le domaine de la technologie, du développement et bien plus.";
  ngOnInit(){}
 
}
