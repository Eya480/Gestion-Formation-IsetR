import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Candidate } from '../../models/candidate';
import { Session } from '../../models/session';
import { Trainings } from '../../models/trainings';
import { Trainer } from '../../models/trainer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  StringToArray(input: string): string[] {
    return input.split(',').map(item => item.trim());
  }

  getCandidats(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseURL}/candidats`);
  }
  getCandidatById(id : string):Observable<Candidate>{
    return this.http.get<Candidate>(`${this.baseURL}/candidats/${id}`);
  }
  getTrainerById(id : string):Observable<Trainer>{
    return this.http.get<Trainer>(`${this.baseURL}/formateurs/${id}`);
  }

  updateCandidate(id: string, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseURL}/candidats/${id}`, candidate);
  }

  deleteCandidate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/candidats/${id}`);
  }

  getFormateurs(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.baseURL}/formateurs`);
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
  addTraining(trainingData: Trainings): Observable<any> {
    return this.http.post( `${this.baseURL}/formations`, trainingData);
  }
  getTrainingByTitre(titre: string): Observable<Trainings[]> {
    return this.http.get<Trainings[]>(`${this.baseURL}/formations?titre=${titre}`);
  }
  //trainer
  updateFormateur(id: string, f: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.baseURL}/formateurs/${id}`, f);
  }

  deleteFormateur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/formateurs/${id}`);
  }
  addTrainer(trainerData: Trainer): Observable<any> {
    return this.http.post( `${this.baseURL}/formateurs`, trainerData);
  }
  getTrainerByEmail(email: string): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.baseURL}/formateurs?email=${email}`);
  }
  //session
  deleteSession(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/sessions/${id}`);
  }
  addSession(sessionData: Session): Observable<any> {
    return this.http.post( `${this.baseURL}/sessions`, sessionData);
  }
  getCandidatsByIds(candidatIds: string[]): Observable<any[]>{
    const candidatRequests = candidatIds.map(id => {
      const url = `${this.baseURL}/candidats?id=${id}`;
      return this.http.get<any>(url); 
    });
  
    // Use forkJoin to wait for all the requests to complete
    return forkJoin(candidatRequests);
  }
  
}
