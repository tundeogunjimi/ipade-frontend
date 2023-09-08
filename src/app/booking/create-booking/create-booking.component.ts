import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  public formErrors: FormError

  public time: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  public slicedTime: any[]
  public selectedTime: string;

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
      name: new FormControl('',),
      email: new FormControl('', ),
      mobile: new FormControl('', ),
      gender: [''],
      date: new FormControl('', ),
      time: new FormControl('', ),
      purpose: [''],
      message: ['']
    })
  }

  saveBooking(): void {
    this.formErrors = {}
    const formValue = this.bookingForm.getRawValue() //todo: trim name & email
    const booking: Booking = {
      date: formValue.date,
      time: this.selectedTime,
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
        error: (e) => {
          this.formErrors = e.error
          console.log(e)
        }
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
        error: (e) => {
          console.log(e.error)
          this.formErrors = e.error
        }
      })
  }

  populateBookingForm(id: string): void {
    this.bookingService.getBooking(id)
      .pipe(take(1))
      .subscribe((booking) => {
        this.bookingForm.patchValue({
          date: booking.date,
          time: this.selectedTime,
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

  sliceTime(): void {
    const eventDate = this.bookingForm.getRawValue().date;
    console.log(`event from p-calendar >>>`, eventDate)
    let start = new Date(eventDate); // format: new Date("2016-05-04T00:00:00.000Z");
    start.setHours(0,0,0,0)
    let end = new Date(start.getTime() + (24 * 60 * 60 * 1000));

    let slices = [];
    let count = 0;

    while (end >= start) {
      slices[count] = start;
      start = new Date(start.getTime() + (30 * 60 * 1000));
      count++;
    }

    this.slicedTime = slices;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }
}

interface FormError {
  name?: string,
  email?: string,
  mobile?: string,
  gender?: string,
  date?: string,
  time?: string,
  purpose?: string,
  message?: string
  status?: string
}
