import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../booking/booking.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../shared/data/auth/user-model";
import {take} from "rxjs";
import {Booking} from "../../shared/data/booking/booking-model";

@Component({
  selector: 'app-scheduled-meetings',
  templateUrl: './scheduled-meetings.component.html',
  styleUrls: ['./scheduled-meetings.component.css']
})
export class ScheduledMeetingsComponent implements OnInit{

  public currentUser: User
  public bookings: Booking[]

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
  ) {
  }
  ngOnInit(): void {
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
        },
        error: (e) => {
          console.log(e)

        }
      })
  }

}
