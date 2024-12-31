import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate';
import { Session } from '../../models/session';
import { Trainings } from '../../models/trainings';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getCandidats(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseURL}/candidats`);
  }
  getCandidatById(id : string):Observable<Candidate>{
    return this.http.get<Candidate>(`${this.baseURL}/candidats/${id}`);
  }

  updateCandidate(id: string, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseURL}/candidats/${id}`, candidate);
  }

  deleteCandidate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/candidats/${id}`);
  }

  getFormateurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/formateurs`);
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseURL}/sessions`);
  }
  //
  updateFormation(id: string, f: Trainings): Observable<Trainings> {
    return this.http.put<Trainings>(`${this.baseURL}/formations/${id}`, f);
  }

  deleteFormation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/formations/${id}`);
  }

}
