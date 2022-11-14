import {
  AfterViewInit,
  Component,
  ElementRef, NgZone,
  ViewChild,
} from '@angular/core';
import {GeocoderAutocomplete} from '@geoapify/geocoder-autocomplete';
import {EventBusService} from "../services/shared/event-bus.service";
import {EventData} from "../services/shared/event.class";


@Component({
  selector: 'app-address-page',
  templateUrl: './address-page.component.html'
})
export class AddressPageComponent implements AfterViewInit {

  @ViewChild('geocoding') geocoding!: ElementRef;
  streetNumber: string = '';
  name: string = '';
  address: any;

  provideManually: boolean = false;
  addressIsValid: boolean = false;
  showInfo: boolean = false;

  constructor(private elem: ElementRef,
              private ngZone: NgZone,
              private eventBusService: EventBusService) {
  }

  ngAfterViewInit(): void {
    const autocomplete = new GeocoderAutocomplete(
      this.geocoding.nativeElement,
      '5b99aac875bc4ab195d9117157efefc2',
      { /* Geocoder options */});

    autocomplete.on('select', (location) => {
      const requiredInfo: boolean = !!(location && location.properties.country && location.properties.state && location.properties.city && location.properties.postcode && location.properties.street);
      this.streetNumber = '';
      this.name = '';
      this.setAddressValidity();
      //Case where there are all info required => no more logic needed//
      if (requiredInfo && location.properties.housenumber) {
        this.provideManually = false;
        this.address = {
          "streetNumber": Number(location.properties.housenumber),
          "street": location.properties.street,
          "zipCode": location.properties.postcode,
          "city": location.properties.city,
          "region": location.properties.state,
          "country": location.properties.country
        }
        //Case where there are all info required except streetNumber//
      } else if (requiredInfo) {
        this.provideManually = true;
        this.address = {
          "street": location.properties.street,
          "zipCode": location.properties.postcode,
          "city": location.properties.city,
          "region": location.properties.state,
          "country": location.properties.country
        }
      }
    });
    //Added event-listener on the clear button of the address//
    //I used NgZone because addressIsValid real value was not reflected in the DOM//
    const clearBtn = this.elem.nativeElement.querySelector('.geoapify-close-button');
    clearBtn.addEventListener("click", () => {
      this.ngZone.run(() => {
        this.streetNumber = '';
        this.name = '';
        this.provideManually = false;
        this.addressIsValid = false;
      });
    });

  }

  setAddressValidity() {
    if(!(!!this.name)){
      //no name -> false
      this.addressIsValid = false;
    } else if(this.provideManually){
      //name, manual -> depends on streetNumber
      this.addressIsValid = !!this.streetNumber;
    } else {
      //name and auto -> true
      this.addressIsValid = true;
    }
  }

  addAddress() {
    this.address.name = this.name;
    if(this.streetNumber){
      this.address.streetNumber = Number(this.streetNumber);
    }
    this.eventBusService.emit(new EventData('sendNewAddress', this.address));

    const input = this.elem.nativeElement.querySelector('.geoapify-autocomplete-input');
    input.value = '';
    this.streetNumber = '';
    this.name = '';
    this.provideManually = false;
    this.addressIsValid = false;
    const closeBtn = this.elem.nativeElement.querySelector('.geoapify-close-button');
    closeBtn.classList.remove('visible');
  }
}
