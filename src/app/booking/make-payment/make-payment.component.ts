import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../booking.service";
import {take} from "rxjs";
import {Booking} from "../../shared/data/booking/booking-model";
import {Transaction} from "../../shared/data/booking/transaction-model";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit{

  public booking: Booking
  public transaction: Transaction

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams
    this.bookingService.verifyPayment(params)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.getBooking(res.booking_id)
          this.transaction = res
          console.log(`transaction >>>`, res)
        },
        error: (e) => { console.log(e)}
      })
  }

  getBooking(id: string): void {
    this.bookingService.getBooking(id)
      .pipe(take(1))
      .subscribe((res) => {
        this.booking = res
      })
  }

  getPaymentStatus(status: string): string {
    return status === 'successful' ? 'PAID' : 'PENDING'
  }
}
