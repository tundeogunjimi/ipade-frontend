import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Booking} from "../../shared/data/booking/booking-model";
import {BookingService} from "../booking.service";
import {take} from "rxjs";
import {MeetingService} from "../../meeting-type/meeting.service";
import {Meeting} from "../../shared/data/meeting/meeting";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit{

  public booking: Booking;
  public meeting: Meeting
  private meetingId: string
  private bookingId: string
  private tenantId:string

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private meetingService: MeetingService,
  ) {
  }

  ngOnInit(): void {
    const tenantUrl = this.activatedRoute.snapshot.params['id']
    this.bookingId = this.activatedRoute.snapshot.queryParams['id']
    this.tenantId = this.activatedRoute.snapshot.queryParams['tenantId']
    this.meetingId = this.activatedRoute.snapshot.queryParams['meetingId']

    this.bookingService.getBooking(this.bookingId, this.tenantId)
      .pipe(take(1))
      .subscribe((res) => {
        this.booking = res
        sessionStorage.setItem('booking_id', this.bookingId)
      })

    this.meetingService.getMeeting(this.meetingId, this.tenantId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.meeting = res
        }
      })
  }

  goBack(): void {
    this.router.navigate([`/booking/edit-booking${this.meeting.link}/${this.booking._id}`], {
      queryParams: { bookingId: this.bookingId, meetingId: this.meetingId, tenantId: this.tenantId }
    })
  }

  proceedToPayment(): void {
    const transaction = { // todo: fetch these from tenant params
      tx_ref: "",
      amount: this.meeting.price,
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
