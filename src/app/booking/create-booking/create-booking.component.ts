import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Booking} from "../../shared/data/booking/booking-model";
import {BookingService} from "../booking.service";
import {take} from "rxjs";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  public bookingForm: FormGroup
  public bookingId: string

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {
  }
  ngOnInit(): void {
    this.createBookingForm()
    this.bookingId = this.activatedRoute.snapshot.params['id']
    if (this.bookingId) {
      this.populateBookingForm(this.bookingId)
    }
  }

  createBookingForm(): void {
    this.bookingForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      gender: [''],
      date: [''],
      time: [''],
      purpose: [''],
      message: ['']
    })
  }

  saveBooking(): void {
    const formValue = this.bookingForm.getRawValue()
    const booking: Booking = {
      appointmentDate: formValue.date,
      appointmentTime: formValue.time,
      completed: false,
      email: formValue.email,
      gender: formValue.gender,
      meetingType: '30 minute meeting',
      message: formValue.message,
      mobile: formValue.mobile,
      name: formValue.name,
      purpose: formValue.purpose,
      status: formValue.status,
      tenantId: '123456' // todo: fetch tenantId from query params
    }

    if (!this.bookingId) {
      this.createBooking(booking)
    } else {
      this.updateBooking(booking)
    }

  }

  createBooking(booking: Booking) {
    console.log(`creating new booking...`)
    this.bookingService.createBooking(booking)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log('booking created successfully')
          this.router.navigate([`/booking/booking-details/${res._id}`])
        },
        error: (e) => {console.log(e)}
      })
  }

  updateBooking(booking) {
    console.log(`updating booking with id: `, this.bookingId)
    this.bookingService.updateBooking(booking, this.bookingId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(`booking with id ${this.bookingId} successfully updated!`)
          this.router.navigate([`/booking/booking-details/${res._id}`])
        },
        error: (e) => { console.log(e) }
      })
  }

  populateBookingForm(id: string): void {
    this.bookingService.getBooking(id)
      .pipe(take(1))
      .subscribe((booking) => {
        this.bookingForm.patchValue({
          appointmentDate: booking.appointmentDate,
          appointmentTime: booking.appointmentTime,
          completed: false,
          email: booking.email,
          gender: booking.gender,
          meetingType: '30 minute meeting',
          message: booking.message,
          mobile: booking.mobile,
          name: booking.name,
          purpose: booking.purpose,
          status: booking.status,
          tenantId: '123456' // todo: fetch tenantId from query params
        })
      })
  }

}
