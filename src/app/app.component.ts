import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {of, switchMap} from "rxjs";
import {ImagesService} from "./services/images.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'e-commerce';
  popUp = true;
  menu = true;
  signIn = true;


  userThumbnail: SafeUrl | undefined = undefined;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private imagesService: ImagesService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.authService.ls.pipe(
      //I care about the last value only
      switchMap(value => value ? this.imagesService.getFile() : of(value))
    ).subscribe(data => {
      if (data instanceof Blob) {
        let objectURL = URL.createObjectURL(data);
        this.userThumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.isLoggedIn = true;
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

