import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {EMPTY, iif, mergeMap, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  popUp = true;
  menu = true

  loginStatus$ = this.authService.getLoginStatus;
  userProfile$ = this.authService.getProfile();

  userProfile: false | {firstName: string, profileImage: string} = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginStatus$.pipe(
      mergeMap((value) => {
          if (value) {
            return this.userProfile$
          }
          return of(value)
        }
      )).subscribe((data) => {
      console.log(data)
      this.userProfile = data;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }


  //TODO : si true requête sur profile ?
  //TODO : interceptor attach acces token to requests
}

