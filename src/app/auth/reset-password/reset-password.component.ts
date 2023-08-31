import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  public resetPasswordForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createResetPasswordForm()
  }

  createResetPasswordForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: [''],
      confirmPassword: [''],
    })
  }

  resetPassword(): void {
    // todo: reset password logic
    this.router.navigate(['/auth/login'])
  }

}
