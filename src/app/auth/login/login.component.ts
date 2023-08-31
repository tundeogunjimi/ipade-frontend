import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn()
    if(isLoggedIn) {
      this.router.navigate(['/profile'])
    }
    this.createLoginForm()
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  login(): void {
    const formValues = this.loginForm.getRawValue()
    const loginDetails = {
      email: formValues.email,
      password: formValues.password
    }

    this.authService.loginUser(loginDetails)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem('user', JSON.stringify(res))
          this.router.navigate(['/profile'])
        },
        error: (e) => { console.log(e.error.message) }
      })
  }

}
