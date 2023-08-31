import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  public forgotPasswordForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForgotPasswordForm()
  }

  createForgotPasswordForm(): void {
    this.forgotPasswordForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  sendResetPasswordLink(): void {
    // todo: passwordLink logic
    this.router.navigate(['/auth/reset-password'])
  }
}
