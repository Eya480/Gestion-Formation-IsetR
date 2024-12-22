import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainings } from '../../models/trainings';

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les formations
  getFormations(): Observable<Trainings[]> {
    return this.http.get<Trainings[]>(`${this.baseUrl}/formations`);
  }
}
