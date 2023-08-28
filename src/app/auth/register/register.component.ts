import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {take} from "rxjs";
import {User} from "../../shared/data/auth/user-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn()
    if(isLoggedIn) {
      this.router.navigate(['/profile'])
    }
    this.createRegisterForm()
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  register(): void {
    const formValues = this.registerForm.getRawValue()
    const user: User = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    }

    this.authService.createUser(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/profile'])
        },
        error: (e) => { console.log(e.error.message) }
      })

  }
}
