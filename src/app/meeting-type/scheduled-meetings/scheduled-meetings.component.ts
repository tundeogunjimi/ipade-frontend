import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../booking/booking.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../shared/data/auth/user-model";
import {take} from "rxjs";
import {Booking} from "../../shared/data/booking/booking-model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-scheduled-meetings',
  templateUrl: './scheduled-meetings.component.html',
  styleUrls: ['./scheduled-meetings.component.css']
})
export class ScheduledMeetingsComponent implements OnInit{

  public currentUser: User
  public bookings: Booking[]
  public filteredBookings: Booking[]
  public dateForm: FormGroup

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit(): void {
    this.dateForm = this.fb.group({
      dateRange: ['']
    })
    this.fetchUserDetails()
  }

  fetchUserDetails(): void {
    this.authService.fetchUserDetails()
      .subscribe({
        next: (user) => {
          this.currentUser = user
          this.getBookings(this.currentUser)
        },
        error: (e) => {
          console.log(e)
          // this.router.navigate(['/login'])
        }
      })
  }

  getBookings(user: User): void {
    this.bookingService.getAllBooking(user.id, user.email)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.bookings = res
          this.fetchPendingMeetings()
        },
        error: (e) => {
          console.log(e)

        }
      })
  }

  fetchPendingMeetings() {
    const today = new Date()
    this.filteredBookings = this.bookings.filter((booking) => new Date(booking.date) > today)
  }

  fetchPastMeetings() {
    const today = new Date()
    this.filteredBookings = this.bookings.filter((booking) => new Date(booking.date) < today)
  }

  setDateRange() {
    this.filteredBookings = []
    const date = this.dateForm.getRawValue().dateRange;
    this.filteredBookings = this.bookings.filter((booking) => new Date(booking.date) >= new Date(date[0]) && new Date(booking.date) <= new Date(date[1]))
    console.log(`formValues`, date, this.filteredBookings)
  }
}
