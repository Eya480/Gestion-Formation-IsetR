import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  titre: string = 'Bienvenue sur notre plateforme de gestion des sessions de formation';
  description: string = 'Découvrez nos catégories et formations pour développer vos compétences.';
  formations: any[] = [];
  categories: Set<string> = new Set();
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Charger les formations
    this.dataService.getFormations().subscribe((data) => {
      this.formations = data;
      // Extraire les catégories dynamiquement
      this.formations.forEach((formation) => {
        formation.categories.forEach((cat: string) => this.categories.add(cat));
      });
    });
  }
}
