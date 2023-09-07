import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Booking} from "../shared/data/booking/booking-model";
import {Observable} from "rxjs";
import {Transaction} from "../shared/data/booking/transaction-model";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })

  private baseUrl = `http://localhost:4200/api`

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/booking/`, JSON.stringify(booking), { headers: this.headers})
  }

  getBooking(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/booking/${id}?tenantId=123456`, { headers: this.headers })
  }

  updateBooking(booking: Booking, id: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/booking/${id}?tenantId=123456`, JSON.stringify(booking), { headers: this.headers})
  }

  deleteBooking(id: string) {}

  makePayment(transaction, booking_id: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/payment/`, JSON.stringify(transaction), { headers: this.headers, params: { booking_id } })
  }

  verifyPayment(params): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/payment/verify`, { headers: this.headers, params })
  }

}
