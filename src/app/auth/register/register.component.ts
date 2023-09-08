import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {take} from "rxjs";
import {User} from "../../shared/data/auth/user-model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

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
    private router: Router,
    private messageService: MessageService
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
    console.log(`user to register >>>`, user)

    this.authService.createUser(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(`created user >>>`, res, res.token)
          this.router.navigate(['/confirm-registration'])
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
          console.log(`error: `, e.error.message)
        }
      })

  }
}
