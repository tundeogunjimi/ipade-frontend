import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import {BookingRoutingModule} from "./booking-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';



@NgModule({
  declarations: [
    CreateBookingComponent,
    MakePaymentComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
