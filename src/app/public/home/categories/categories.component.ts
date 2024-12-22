import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/public.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
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
