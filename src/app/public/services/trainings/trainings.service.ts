import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
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
  getFormationById(id: string): Observable<Trainings> {
    return this.http.get<Trainings>(`${this.baseUrl}/formations/${id}`);
  }
  getSessionsByFormationId(id : string) : Observable <any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/sessions?formationId=${id}`);
  }
  //
  getFormateursByIds(formateurIds: string[]): Observable<any[]> {
    // Construct the query string with multiple 'id' parameters
    const params = formateurIds.map(id => `id=${id}`).join('&');
    const formateurRequests = formateurIds.map(id => {
      const url = `${this.baseUrl}/formateurs?id=${id}`;
      return this.http.get<any>(url); // Return an observable for each formateur
    });
  
    // Use forkJoin to wait for all the requests to complete
    return forkJoin(formateurRequests);
  }
  

  
  
}
