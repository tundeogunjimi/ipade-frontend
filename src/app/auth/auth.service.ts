import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/data/auth/user-model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = environment.apiUrl +'/users'

  constructor(private http: HttpClient) {
    console.log(`baseUrl >>>`, this.baseUrl)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, JSON.stringify(user), { headers: this.headers})
  }

  loginUser(loginDetails): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, JSON.stringify(loginDetails), { headers: this.headers})
  }

  fetchUserDetails(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, { headers: this.headers })
  }

  confirmUser(queryParams): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/confirm`, { headers: this.headers, params: queryParams })
  }

  updateProfile(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/update`, JSON.stringify(user), { headers: this.headers})
  }

  uploadProfilePicture(profileData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/upload`, JSON.stringify(profileData), { headers: this.headers})
  }

  deleteProfile(user: User): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/delete?id=${user.id}&email=${user.email}`,  { headers: this.headers})
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
