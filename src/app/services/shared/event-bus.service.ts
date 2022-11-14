import {Injectable} from '@angular/core';
import {filter, map, Subject, Subscription} from "rxjs";
import {EventData} from "./event.class";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();

  constructor() {
  }

  //emit some new data
  emit(e: EventData) {
    this.subject$.next(e);
  }

  //handle events
  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      // @ts-ignore
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}


