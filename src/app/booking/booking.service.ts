import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Booking} from "../shared/data/booking/booking-model";
import {Observable} from "rxjs";
import {Transaction} from "../shared/data/booking/transaction-model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/booking`, JSON.stringify(booking), { headers: this.headers})
  }

  getAllBooking(tenantId: string, email: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/booking?tenantId=${tenantId}&email=${email}`, { headers: this.headers })
  }

  getBooking(id: string, tenantId): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/booking/${id}?tenantId=${tenantId}`, { headers: this.headers })
  }

  updateBooking(booking: Booking, id: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/booking/${id}?tenantId=${booking.tenantId}`, JSON.stringify(booking), { headers: this.headers})
  }

  deleteBooking(id: string) {}

  makePayment(transaction, booking_id: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/payment`, JSON.stringify(transaction), { headers: this.headers, params: { booking_id } })
  }

  verifyPayment(params): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/payment/verify`, { headers: this.headers, params })
  }

}
