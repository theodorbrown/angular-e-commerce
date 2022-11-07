import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../constants/global-constants";
import {BehaviorSubject, tap,} from "rxjs";
import {Router} from "@angular/router";
import {LoginUser, registerUser} from "../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ls = new BehaviorSubject<boolean>(this.getLoginStatus());

  constructor(private http: HttpClient, private router: Router) {
  }

  register(payload: any) {
    //no token needed
    return this.http.post<any>(GlobalConstants.API_URL + 'auth/register', payload).pipe(
      tap(_ => {
        this.router.navigate(['/signin']);
      })
    )
    //will return the new user
  }

  login(payload: LoginUser) {
    //no token needed
    return this.http.post<LoginUser>(GlobalConstants.API_URL + 'auth/login', payload).pipe(
      tap(_ => {
        this.addToLocalStorage();
        this.router.navigate(['/']);
      })
    )
    //will return access token and refresh token in cookie and user
  }

  refresh() {
    //refresh token needed in header cookie
    return this.http.post(GlobalConstants.API_URL + 'auth/refresh', {})
    //will return new access token and refresh token in cookie (success true)
  }

  logout() {
    //auth token needed in header cookie
    return this.http.post(GlobalConstants.API_URL + 'auth/logout', {}).pipe(
      tap(res => {
        //+ back-end API removes cookie from client (HttpOnly)
        this.removeFromLocalStorage();
        this.router.navigate(['/signin']);
      })
    )
    //will return success true
  }

  addToLocalStorage() {
    localStorage.setItem('connected', 'true');
    this.ls.next(true);
  }

  removeFromLocalStorage() {
    localStorage.removeItem('connected');
    this.ls.next(false);
  }

  getLoginStatus(): boolean {
    return !!localStorage.getItem('connected');
  }
}
