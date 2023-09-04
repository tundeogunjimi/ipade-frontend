import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateBookingComponent} from "./create-booking/create-booking.component";
import {MakePaymentComponent} from "./make-payment/make-payment.component";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";

const routes: Routes = [
  { path: 'new-booking', component: CreateBookingComponent },
  { path: 'booking-details', component: BookingDetailsComponent },
  { path: 'make-payment', component: MakePaymentComponent },

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BookingRoutingModule { }
