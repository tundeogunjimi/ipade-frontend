import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from "../../shared/data/auth/user-model";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {take} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser: User;
  public profileForm: FormGroup
  public profilePicture: any
  public profileData: any;
  public labels = {
    altText: '',
    name: ''
  }

  public isFormTouched: boolean


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn()
    if (!isLoggedIn) this.router.navigate(['/'])
    this.createProfileForm()

    this.fetchUserDetails()
    if (localStorage.getItem('reload') && isLoggedIn) {
      localStorage.removeItem('reload')
      window.location.reload()
    } else {
      localStorage.setItem('reload', 'true')
    }

  }

  createProfileForm(): void {
    this.profileForm = this.fb.group({
      name: [''],
      // email: [''],
      bio: ['']
    })
  }

  fetchUserDetails() {
    this.authService.fetchUserDetails()
      .subscribe({
        next: (user) => {
          console.log(`logged in user `, user)
          this.currentUser = user
          if (user.accountType === 'personal') {
            this.labels = {
              altText: 'profile picture',
              name: 'Full name'
            }
          } else if (user.accountType === 'business') {
            this.labels = {
              altText: 'company logo',
              name: 'Company name'
            }
          }
          this.patchProfileForm(user)
        },
        error: (e) => {
          console.log(e)
          // this.router.navigate(['/login'])
        }
      })
  }

  patchProfileForm(user: User) {
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
      bio: user.bio
    })
  }

  updateProfile(): void {
    const formValues = this.profileForm.getRawValue()
    const user = {
      id: this.currentUser.id,
      name: formValues.name || this.currentUser.name,
      email: this.currentUser.email,
      bio: formValues.bio || this.currentUser.bio
    }

    this.authService.updateProfile(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(`profile update >>> `, res)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile successfully updated' });
          this.fetchUserDetails()
          this.isFormTouched = false
        },
        error: (e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
        }
      })
  }

  deleteProfile(): void {
    this.authService.deleteProfile(this.currentUser)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(`profile deleted`, res)
          localStorage.removeItem('user')
          window.location.reload()
        },
        error: (e) => {
          console.log(`error >>> `, e.message)
        }
      })
  }

  onFileChange(event) {
    const files = event.target.files as FileList;
    if (!files || files.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Select an image'
      });
      return
    }

    if((files[0].type) ===null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Only images are supported'
      });
      return
    }
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])

    reader.onload = () => {
      // this.profilePicture = reader.result
      this.profileData = {
        user: this.currentUser,
        img: reader.result
      }

      console.log(reader.result)
    }

  }

  uploadProfilePicture() {
    this.authService.uploadProfilePicture(this.profileData)
      .pipe(take(1))
      .subscribe({

      })
  }

  clearForm(): void {
    this.profileForm.reset()
    this.patchProfileForm(this.currentUser)
  }

  checkFormStatus(): void {
    const formValues = this.profileForm.getRawValue()
    const previousFormValue = {
      name: this.currentUser.name,
      bio: this.currentUser.bio
    }

    let falseCount = 0
    for (const key in previousFormValue) {
      if (formValues[key] !== previousFormValue[key]) falseCount++
    }

    this.isFormTouched = falseCount !== 0
  }

}
