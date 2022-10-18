import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../constants/global-constants";
import {BehaviorSubject, map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus = new BehaviorSubject(this.isLoggedIn());

  constructor(private http: HttpClient) { }

  login(payload: any) {
    return this.http.post(GlobalConstants.API_URL + 'auth/login', payload).pipe(
      tap(res => {
        this.setSession(res as Token);
        this.loginStatus.next(true);
      })
    )
  }

  private isLoggedIn(): boolean{
    return !!localStorage.getItem('access_token');
  }

  get getLoginStatus(){
    return this.loginStatus.asObservable();
  }

  logout(){
    localStorage.removeItem('access_token');
    this.loginStatus.next(false);
  }

  private setSession(authResult: Token){
    localStorage.setItem('access_token', authResult.access_token);
  }

  getProfile(): Observable<any>{
    return this.http.get<any>(GlobalConstants.API_URL + 'auth/profile')
  }
}

export interface Token {
  access_token: string;
}
