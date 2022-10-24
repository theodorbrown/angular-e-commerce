import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../constants/global-constants";
import {
  BehaviorSubject,
  catchError,
  concatMap, EMPTY, empty, finalize,
  first, interval,
  lastValueFrom,
  map,
  of,
  switchMap,
  take, takeUntil,
  tap,
  timeout
} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ls = new BehaviorSubject<boolean>(this.getLoginStatus());

  constructor(private http: HttpClient, private router: Router) {
  }

  //TODO : type
  register(payload: any) {
    //no token needed
    return this.http.post(GlobalConstants.API_URL + 'auth/register', payload);
    //will return the new user
  }

  login(payload: any) {
    //no token needed
    return this.http.post(GlobalConstants.API_URL + 'auth/login', payload).pipe(
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

  addToLocalStorage(){
    localStorage.setItem('connected','true');
    this.ls.next(true);
  }

  removeFromLocalStorage(){
    localStorage.removeItem('connected');
    this.ls.next(false);
  }

  getLoginStatus(): boolean {
    return !!localStorage.getItem('connected');
  }
}
