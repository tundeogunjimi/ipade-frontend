import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {take} from "rxjs";
import {User} from "../../data/auth/user-model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public currentUser: User

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getUsername()
  }

  getUsername(): void {
    if (this.isLoggedIn()) {
      this.authService.fetchUserDetails()
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            this.currentUser = user
            this.cdr.detectChanges()
          }
        })
    } else {
      this.router.navigate(['/'])
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  logout(): void {
    localStorage.removeItem('user')
    this.currentUser = null
    this.router.navigate(['/'])
  }
}
