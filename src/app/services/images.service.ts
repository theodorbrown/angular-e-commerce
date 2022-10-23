import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../constants/global-constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getFile(): Observable<any>{
    // @ts-ignore
    return this.http.get<any>(GlobalConstants.API_URL + 'images', {responseType: 'blob'});
  }
}
