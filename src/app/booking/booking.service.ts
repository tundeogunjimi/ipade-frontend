import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Booking} from "../shared/data/booking/booking-model";
import {Observable} from "rxjs";
import {User} from "../shared/data/auth/user-model";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = `http://localhost:4200/api/booking`

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}`, JSON.stringify(booking), { headers: this.headers})
  }
}
