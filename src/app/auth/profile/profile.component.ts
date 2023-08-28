import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/data/auth/user-model";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.fetchUserDetails()
  }

  fetchUserDetails() {
    this.authService.fetchUserDetails()
      .subscribe({
        next: (user) => { this.currentUser = user },
        error: (e) => {
          console.log(e)
          // this.router.navigate(['/login'])
        }
      })
  }

}
