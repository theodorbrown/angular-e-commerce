import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../constants/global-constants";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  login(payload: any) {
    //no token needed
    return this.http.post(GlobalConstants.API_URL + 'auth/login', payload).pipe(
      tap(res => {
        this.loginStatus.next(true);
      })
    )
    //will return access token and refresh token in cookie (success true)
  }

  refresh(){
    //refresh token needed in header cookie
    return this.http.post(GlobalConstants.API_URL + 'auth/refresh', {})
    //will return new access token and refresh token in cookie (success true)
  }

  logout(){
    //auth token needed in header cookie
    return this.http.post(GlobalConstants.API_URL + 'auth/logout', {})
    //will return success true
  }
}
