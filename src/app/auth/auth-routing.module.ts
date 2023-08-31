import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {HomeComponent} from "../home/home.component";
import {ConfirmRegistrationComponent} from "./confirm-registration/confirm-registration.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-registration', component: ConfirmRegistrationComponent },
  { path: '**', component: HomeComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthRoutingModule { }
