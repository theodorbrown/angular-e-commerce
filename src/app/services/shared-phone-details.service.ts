import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedPhoneDetailsService {

  // Observable sources
  private phoneDetailsSource = new Subject<any>();

  // Observable string streams
  phoneDetails$ = this.phoneDetailsSource.asObservable();

  constructor() { }

  // Service
  announcePhoneDetails(details: any) {
    this.phoneDetailsSource.next(details);
  }
}
