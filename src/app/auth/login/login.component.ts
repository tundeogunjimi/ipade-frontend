import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.isSubmitted = false
    const isLoggedIn = this.authService.isLoggedIn()
    if(isLoggedIn) {
      this.router.navigate(['/profile'])
    }
    this.createLoginForm()
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
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
          this.isSubmitted = true
          localStorage.setItem('user', JSON.stringify(res))
          this.router.navigate(['/meeting'])
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
          this.isSubmitted = false
          console.log(e.error.message)
        }
      })
  }

}
