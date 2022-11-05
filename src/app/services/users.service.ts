import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../constants/global-constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  userExist(email: string): Observable<any>{
    return this.http.get<any>(GlobalConstants.API_URL + `users/exist/${email}`);
  }

  getUser(){
    return this.http.get<any>(GlobalConstants.API_URL + 'users');
  }


}

//TODO : Make email check func and const for API URL
