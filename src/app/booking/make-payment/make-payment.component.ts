import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent {

  constructor(
    private router: Router
  ) {
  }


}
