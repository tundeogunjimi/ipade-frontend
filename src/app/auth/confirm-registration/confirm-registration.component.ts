import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit{

  private confirmationToken: string
  public isConfirmed: boolean = false
  public confirmationMessage: string = 'a confirmation link has been sent to your registered email address.'

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.confirmationToken = this.activatedRoute.snapshot.queryParams['confirmation_token']
    const queryParams = this.activatedRoute.snapshot.queryParams

    if(this.confirmationToken) {
      this.authService.confirmUser(queryParams)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            console.log(`user confirmed!`, res)
            this.isConfirmed = true
          },
          error: (e) => {
            this.confirmationMessage = e.error.message + `!!!`
            console.log(`error >>> `, this.confirmationMessage)
          }
        })
    }

    const isLoggedIn = this.authService.isLoggedIn()
    if(isLoggedIn) {
      this.router.navigate(['/profile'])
    }
  }

}
