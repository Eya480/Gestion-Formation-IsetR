import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = 'http://localhost:3000'; 
  constructor(private http: HttpClient) {}

  getCandidats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/candidats`);
  }

  getFormateurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/formateurs`);
  }

  getSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/sessions`);
  }

  getTrainings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/formations`);
  }
}