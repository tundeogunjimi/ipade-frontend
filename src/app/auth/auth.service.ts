import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/data/auth/user-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = `http://localhost:4200/api/users`

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, JSON.stringify(user), { headers: this.headers})
  }

  loginUser(loginDetails): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, JSON.stringify(loginDetails), { headers: this.headers})
  }

  fetchUserDetails(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, { headers: this.headers })
  }

  getAuthToken(): string {
    const token = (JSON.parse(localStorage.getItem('user'))).token
    if (!token) {
      return 'You must be logged in to access your profile details'
    }
    return token;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

}
