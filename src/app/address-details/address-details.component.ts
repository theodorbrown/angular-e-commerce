import { Component, OnInit } from '@angular/core';
import {EventBusService} from "../services/shared/event-bus.service";
import {EventData} from "../services/shared/event.class";

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html'
})
export class AddressDetailsComponent implements OnInit {

  address: any;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.eventBusService.on('sendAddress', (address: any ) => this.address = address);
  }

  deleteAddress(_id: string) {
    this.eventBusService.emit(new EventData('deleteAddress', _id));
    this.address = null;
  }
}
