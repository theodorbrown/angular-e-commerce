import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {mergeMap, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'e-commerce';
  popUp = true;
  menu = true

  loginStatus$ = this.authService.loginStatus;

  constructor(private authService: AuthService, private router: Router) {
  }

 /* ngOnInit(): void {
    this.loginStatus$.pipe(
      mergeMap((value) => value ? this.userProfile$ : of(value)))
      .subscribe((data) => this.userProfile = data)

    //TODO: how to disco users after expire
  }*/

  logout() {
    this.authService.logout().subscribe({
      complete: () => {
        //delete cookie :D in back-end
        this.router.navigate(['']);
      }
    });
  }

}

