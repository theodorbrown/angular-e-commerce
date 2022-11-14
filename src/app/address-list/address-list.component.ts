import { Component, OnInit } from '@angular/core';
import {AddressesService} from "../services/addresses.service";
import {Observable} from "rxjs";
import {EventBusService} from "../services/shared/event-bus.service";
import {EventData} from "../services/shared/event.class";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent implements OnInit {

  addresses: any[] = [];

  constructor(private addressesService: AddressesService,
              private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.addressesService.getAddress().subscribe(value => this.addresses = value);

    this.eventBusService.on('sendNewAddress', (address: any) => {
      this.addresses.push(address);
      this.addressesService.postAddress(address).subscribe();
    })
    this.eventBusService.on('deleteAddress', (_id: any) => {
      //find object in array and delete
      const index = this.addresses.findIndex(object => object._id === _id)
      this.addresses.splice(index, 1);
      this.addressesService.deleteAddress(_id).subscribe();
    })
  }

  sendAddress(address: any) {
    this.eventBusService.emit(new EventData('sendAddress', address));
  }
}
