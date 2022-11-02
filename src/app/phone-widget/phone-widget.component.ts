import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {defaultPhoneDetails, phoneConfig} from "../register-form/validators/phone-config";
import {FormGroup} from "@angular/forms";
import {SharedPhoneDetailsService} from "../services/shared-phone-details.service";

@Component({
  selector: 'app-phone-widget',
  templateUrl: './phone-widget.component.html'
})
export class PhoneWidgetComponent implements OnInit {

  select: boolean = false;

  phoneDetails = {
    ...defaultPhoneDetails
  }

  phoneConfig = [
    ...phoneConfig
  ]

  @Input()
  form!: FormGroup

  @Input()
  classes: string = '';

  constructor(private sharedPhoneDetailsService: SharedPhoneDetailsService) {
  }

  ngOnInit(): void {
    this.sharedPhoneDetailsService.announcePhoneDetails({
      country: this.phoneDetails.country,
      code: this.phoneDetails.code
    });

  //  this.phoneSetter();
  }

  updatePhoneDetails(obj: any) {
    this.phoneDetails = {
      ...obj
    }
    this.sharedPhoneDetailsService.announcePhoneDetails({
      country: this.phoneDetails.country,
      code: this.phoneDetails.code
    });
  }

  get phone() {
    return this.form.get('phone');
  }

  phoneSetter() {
    const phoneValue = this.phone?.value;
    const country = phoneValue.slice(0, 2);
    const row = this.phoneConfig.find(elem => elem.country === country);
    const codeLength = String(row!.code).length;
    const finalValue = phoneValue.slice(3 + codeLength);
    setTimeout(() => {
      this.phone?.setValue(finalValue);
    }, 0)
  }

}

//erreur pas bien allignée dans phone
//le champs phone qui doit supprimmer des cars en fonction du country et code

