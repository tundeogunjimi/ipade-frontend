import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Booking} from "../../shared/data/booking/booking-model";
import {BookingService} from "../booking.service";
import {take} from "rxjs";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit{

  public booking: Booking;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.bookingService.getBooking(id)
      .pipe(take(1))
      .subscribe((res) => {
        this.booking = res
        sessionStorage.setItem('booking_id', id)
      })
  }

  goBack(): void {
    this.router.navigate([`/booking/edit-booking/${this.booking._id}`])
  }

  proceedToPayment(): void {
    const transaction = { // todo: fetch these from tenant params
      tx_ref: "",
      amount: "100",
      currency: "NGN",
      redirect_url: "http://localhost:4200/booking/make-payment", // todo: set dynamically for dev & prod
      meta: { // todo: decide what include here
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a"
      },
      customer: {
        email: this.booking.email,
        phonenumber: '08060911051',
        name: this.booking.name
      },
      customizations: { // todo: fetch these from tenant params
        title: "Lucent Payments",
        logo: ""
      }
    }
    this.bookingService.makePayment(transaction, this.booking._id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res)
          window.location.href = res.payment_link.data.link
        },
        error: (e) => {console.log(e)}
      })
  }

}
