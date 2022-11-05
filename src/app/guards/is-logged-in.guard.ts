import {Injectable} from '@angular/core';
import {CanActivate, CanDeactivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    const isLoggedIn = this.authService.getLoginStatus();
    if(!isLoggedIn){
      this.router.navigate(['/signin']);
    }
    return this.authService.getLoginStatus();
  }

}
