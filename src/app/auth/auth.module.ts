import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import { AvatarComponent } from './profile/avatar/avatar.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmRegistrationComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterLink,
    MessagesModule,
    ToastModule,
    ImageCropperModule
  ]
})
export class AuthModule { }
