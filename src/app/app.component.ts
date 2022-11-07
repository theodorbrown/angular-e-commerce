import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {forkJoin, of, switchMap} from "rxjs";
import {ImagesService} from "./services/images.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'e-commerce';
  popUp = true;
  menu = true;
  signIn = true;


  userThumbnail: SafeUrl | undefined;
  userName: string | undefined;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private imagesService: ImagesService,
              private sanitizer: DomSanitizer,
              private usersService: UsersService) {
  }

  ngOnInit() {
    this.authService.ls.pipe(
      //I care about the last value only
      switchMap(value => value ? forkJoin([this.imagesService.getFile(), this.usersService.getUser()]) : of(value))
    ).subscribe(data => {
      if (data) {
        let objectURL = URL.createObjectURL(data[0]);
        this.userThumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.isLoggedIn = true;
        this.userName = data[1].firstName;
      } else {
        this.isLoggedIn = false;
        this.userThumbnail = undefined;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }
}

