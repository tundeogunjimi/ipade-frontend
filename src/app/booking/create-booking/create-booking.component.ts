import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Booking} from "../../shared/data/booking/booking-model";
import {BookingService} from "../booking.service";
import {take} from "rxjs";
import {MeetingService} from "../../meeting/meeting.service";
import {Meeting} from "../../shared/data/meeting/meeting";

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
  public slicedTime: any[] = []
  public selectedTime: string
  public meeting: Meeting
  public minDate: Date
  public maxDate: Date
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
    this.bookingId = this.activatedRoute.snapshot.params['bookingId'] // for editing booking
    this.tenantId = this.activatedRoute.snapshot.queryParams['tenantId']
    this.meetingId = this.activatedRoute.snapshot.queryParams['meetingId']
    console.log(`booking id >>> `, this.bookingId)

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
          const tenantNameArr = (this.meeting.link.split('-'))
          this.tenantName = tenantNameArr.join(' ')
          this.minDate = new Date(res.dateRange.start)
          this.maxDate = new Date(res.dateRange.end)
          console.log(`meeting dates >>>`, this.minDate, this.maxDate)
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

    const extras = {
      queryParams: {
        bookingId: this.bookingId,
        meetingId: this.meetingId,
        tenantId: this.tenantId
      },
      tenantUrl: this.meeting.link,
    }

    const booking: Booking = { // todo: add meetingId to fetch required details on next screen
      date: formValue.date,
      time: this.selectedTime || formValue.t,
      completed: false,
      email: formValue.email,
      meetingType: this.meeting.name,
      message: formValue.message,
      name: formValue.name,
      tenantId: this.tenantId,
      location: this.meeting.location,
      extras
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

          extras.queryParams.bookingId = res.id
          // extras.queryParams.bookingId = this.bookingId

          sessionStorage.setItem(`ipadeExtras`, JSON.stringify(extras))
          this.router.navigate([`/booking/booking-details/${this.meeting.link}`],
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
          extras.queryParams.bookingId = this.bookingId

          this.router.navigate([`/booking/booking-details/${this.meeting.link}`],
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
        this.sliceTime(this.meeting?.duration)
        this.selectTime(this.selectedTime)

        console.log(`booking  >>>`, booking)
        this.bookingForm.patchValue({
          date: booking.date,
          time: this.selectedTime,
          completed: false,
          email: booking.email,
          meetingType: booking.meetingType,
          message: booking.message,
          name: booking.name,
          status: booking.status,
          tenantId: this.tenantId
        })
      })
  }

  sliceTime(duration): void {
    const eventDate = this.bookingForm.getRawValue().date || this.defaultDate;
    let start = new Date(eventDate); // format: new Date("2016-05-04T00:00:00.000Z");
    const resumptionTime = new Date(this.meeting?.resumptionTime)
    const closingTime = new Date(this.meeting?.closingTime)
    start.setHours(resumptionTime.getHours(),resumptionTime.getMinutes(),0,0)
    // let end = new Date(start.getTime() + (12 * 60 * 60 * 1000)); // use meeting time
    let end = new Date(eventDate)
    end.setHours(closingTime.getHours(), closingTime.getMinutes(), 0, 0)

    let slices = [];
    let count = 0;

    while (end >= start) {
      slices[count] = start;
      start = new Date(start.getTime() + (duration * 60 * 1000));
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
