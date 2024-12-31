import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Trainings } from '../models/trainings';
import { Candidate } from '../models/candidate';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
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
    const formateurRequests = formateurIds.map(id => {
      const url = `${this.baseUrl}/formateurs?id=${id}`;
      return this.http.get<any>(url); 
    });
  
    // Use forkJoin to wait for all the requests to complete
    return forkJoin(formateurRequests);
  }
  //
  addcandidate(candidate: Candidate): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidats`, candidate);
  }
  
  getUserByEmail(email: string): Observable<Candidate[]> {
    // Renvoie un tableau de candidats avec cet email
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidats?email=${email}`);
  }
  // Récupérer les détails d'une session par ID
  getSessionById(sessionId: string): Observable<Session> {
    return this.http.get<Session>(`${this.baseUrl}/sessions/${sessionId}`);
  }

  updateSession(session: Session): Observable<Session> {
    return this.http.put<Session>(`${this.baseUrl}/sessions/${session.id}`, session);
  }
  
  //npx json-server --watch src/assets/db.json --port 3000

}
