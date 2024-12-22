import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les formations
  getFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/formations`);
  }

  // Récupérer les catégories (si nécessaires, elles peuvent être extraites dynamiquement des formations)
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/formations`);
  }

  // Récupérer les détails d'une formation par ID
  getFormationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/formations/${id}`);
  }
}
