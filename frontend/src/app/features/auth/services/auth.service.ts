import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../store/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<User> {
    // POST /api/auth/login
    return this.http.post<User>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: RegisterRequest): Observable<User> {
    // POST /api/auth/register
    return this.http.post<User>(`${this.apiUrl}/register`, credentials);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }
}