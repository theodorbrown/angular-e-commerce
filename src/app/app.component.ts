import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'e-commerce';
  popUp = true;
  menu = true

  loginStatus$!: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginStatus$ = this.authService.getLoginStatus;

    //TODO : si true requête sur profile ?
    //TODO : interceptor attach acces token to requests
  }
}

