import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Meeting} from "../shared/data/meeting/meeting";
import {Observable} from "rxjs";
import {Booking} from "../shared/data/booking/booking-model";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = `http://localhost:4200/api`

  constructor(private http: HttpClient) { }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.baseUrl}/meeting/`, JSON.stringify(meeting), { headers: this.headers})
  }

  getMeetings(tenantId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/meeting?tenantId=${tenantId}`, { headers: this.headers })
  }

  updateMeeting(meeting: Meeting, id: string, tenantId: string): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.baseUrl}/meeting/${id}?tenantId=${tenantId}`, JSON.stringify(meeting), { headers: this.headers})
  }
}
