import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private bookingService: BookingService
  ) {
  }
  ngOnInit(): void {
    /*const isLoggedIn = this.authService.isLoggedIn()
    if(!isLoggedIn) {
      this.router.navigate(['/auth/login'])
    }*/
    this.createBookingForm()
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

    this.bookingService.createBooking(booking)
      .pipe(take(1))
      .subscribe({
        next: (res) => { console.log('booking created successfully')},
        error: (e) => {console.log(e)}
      })
    console.log(`form values >>>`, formValue)

    this.router.navigate(['/booking/booking-details'])
  }
}
