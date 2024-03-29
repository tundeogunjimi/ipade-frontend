import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Meeting} from "../shared/data/meeting/meeting";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.baseUrl}/meeting/`, JSON.stringify(meeting), { headers: this.headers})
  }

  getMeeting(meetingId: string, tenantId: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/meeting/i/${meetingId}/?meetingId=${meetingId}&tenantId=${tenantId}` )
  }

  getMeetings(tenantId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/meeting?tenantId=${tenantId}`, { headers: this.headers })
  }


  getMeetingsByUsername(username: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/meeting/${username}`, { headers: this.headers })
  }

  updateMeeting(meeting: Meeting, id: string, tenantId: string): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.baseUrl}/meeting/${id}?tenantId=${tenantId}`, JSON.stringify(meeting), { headers: this.headers})
  }

  deleteMeeting(id: string): Observable<any> {
    return this.http.delete<Meeting>(`${this.baseUrl}/meeting/${id}`,{ headers: this.headers})
  }

  // email share
  shareLinkViaEmail(sharePayload): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.baseUrl}/message/shareMeetingLink`, JSON.stringify(sharePayload), { headers: this.headers})
  }
}
