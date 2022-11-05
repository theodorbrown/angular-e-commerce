import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(): boolean {
    return !this.authService.getLoginStatus();
  }

}
