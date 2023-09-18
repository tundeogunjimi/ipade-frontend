import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Booking} from "../../shared/data/booking/booking-model";
import {BookingService} from "../booking.service";
import {take} from "rxjs";
import {MeetingService} from "../../meeting-type/meeting.service";
import {Meeting} from "../../shared/data/meeting/meeting";
import {User} from "../../shared/data/auth/user-model";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  public bookingForm: FormGroup
  public bookingId: string
  public meetingId: string
  public tenantId: string
  public tenantName: string = ''
  private tenantUrl: string
  public formErrors: FormError
  public slicedTime: any[]
  public selectedTime: string
  public meeting: Meeting
  public minDate: Date = new Date()
  public defaultDate: Date

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private meetingService: MeetingService
  ) {}
  ngOnInit(): void {
    this.createBookingForm()
    this.bookingId = this.activatedRoute.snapshot.params['id'] // for editing booking
    this.tenantId = this.activatedRoute.snapshot.queryParams['tenantId']
    this.meetingId = this.activatedRoute.snapshot.queryParams['meetingId']

    this.getMeeting(this.meetingId, this.tenantId)

    if (this.bookingId) {
      this.populateBookingForm(this.bookingId)
    }
  }

  getMeeting(id: string, tenantId): void {
    this.meetingService.getMeeting(id, tenantId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.meeting = res
          const tenantNameArr = (this.meeting.link.split('/')[1]).split('-')
          this.tenantName = `${tenantNameArr[0]} ${tenantNameArr[1]}`
        },
        error: (e) => {
          console.log(`error: `, e.error.message)
        }
      })
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

    const booking: Booking = { // todo: add meetingId to fetch required details on next screen
      date: formValue.date,
      time: this.selectedTime || formValue.t,
      completed: false,
      email: formValue.email,
      // gender: formValue.gender,
      meetingType: this.meeting.name,
      message: formValue.message,
      // mobile: formValue.mobile,
      name: formValue.name,
      // purpose: formValue.purpose,
      // status: formValue.status,
      tenantId: this.tenantId
    }

    const extras = {
      queryParams: {
        id: this.bookingId,
        meetingId: this.meetingId,
        tenantId: this.tenantId
      },
      tenantUrl: this.meeting.link,
    }

    if (!this.bookingId) {
      this.createBooking(booking, extras)
    } else {
      this.updateBooking(booking, extras)
    }

  }

  createBooking(booking: Booking, extras: any) {
    this.bookingService.createBooking(booking)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log('booking created successfully', res)
          extras.queryParams.id = res._id
          sessionStorage.setItem(`ipadeExtras`, JSON.stringify(extras))
          this.router.navigate([`/booking/booking-details${this.meeting.link}`],
            { queryParams: extras.queryParams }
          )
        },
        error: (e) => {
          this.formErrors = e.error
          console.log(`error >>> `, e.error)
        }
      })
  }

  updateBooking(booking, extras: any) {
    console.log(`updating booking with id: `, this.bookingId)
    this.bookingService.updateBooking(booking, this.bookingId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(`booking with id ${this.bookingId} successfully updated!`)

          this.router.navigate([`/booking/booking-details${this.meeting.link}`],
            { queryParams: extras.queryParams }
          )
        },
        error: (e) => {
          console.log(e.error)
          this.formErrors = e.error
        }
      })
  }

  populateBookingForm(id: string): void {
    this.bookingService.getBooking(id, this.tenantId)
      .pipe(take(1))
      .subscribe((booking) => {

        this.selectedTime = booking.time
        this.defaultDate = new Date(booking.date)
        this.sliceTime()
        this.selectTime(this.selectedTime)

        console.log(`booking date >>>`, this.defaultDate)
        this.bookingForm.patchValue({
          date: booking.date,
          time: this.selectedTime,
          completed: false,
          email: booking.email,
          // gender: booking.gender,
          meetingType: booking.meetingType,
          message: booking.message,
          // mobile: booking.mobile,
          name: booking.name,
          // purpose: booking.purpose,
          status: booking.status,
          tenantId: this.tenantId
        })
      })
  }

  sliceTime(): void {
    const eventDate = this.bookingForm.getRawValue().date || this.defaultDate;
    console.log(`event from p-calendar >>>`, eventDate)
    let start = new Date(eventDate); // format: new Date("2016-05-04T00:00:00.000Z");
    start.setHours(7,0,0,0)
    let end = new Date(start.getTime() + (12 * 60 * 60 * 1000));

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

  formatTime(time: string): number {
    return new Date(time).getTime()
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
