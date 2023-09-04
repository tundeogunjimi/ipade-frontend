import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {

  constructor(
    private router: Router
  ) {
  }

  goBack(): void {
    this.router.navigate(['/booking/new-booking'])
  }

  proceedToPayment(): void {
    this.router.navigate(['/booking/make-payment'])
  }

}
