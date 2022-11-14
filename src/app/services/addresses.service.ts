import { Injectable } from '@angular/core';
import { GlobalConstants} from "../constants/global-constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class AddressesService {

  constructor(private http: HttpClient) { }

  getAddress() {
    return this.http.get<any>(GlobalConstants.API_URL + 'addresses');
    //returns all addresses from user
  }

  postAddress(address: any){
    return this.http.post<any>(GlobalConstants.API_URL + 'addresses', address);
  }

  deleteAddress(_id: string){
    return this.http.delete<any>(GlobalConstants.API_URL + `addresses/${_id}`);
  }
}
