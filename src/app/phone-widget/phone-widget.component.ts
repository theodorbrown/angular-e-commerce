import {Component, Input, OnInit} from '@angular/core';
import {Phone, phoneSpecs} from "../register-form/validators/phone-config";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-phone-widget',
  templateUrl: './phone-widget.component.html'
})
export class PhoneWidgetComponent implements OnInit {

  select: boolean = false;
  phoneSpecs: Phone[] = phoneSpecs;

  @Input()
  parentForm!: FormGroup;

  @Input()
  fGroupName!: string;

  @Input()
  classes: string | undefined;

  minLength: number = 9;
  maxLength: number = 9;

  constructor() {
  }

  ngOnInit(): void {
    this.setLengths(this.prefix.value);
  }

  get prefix() {
    return this.parentForm.get('phone.prefix') as FormControl;
  }

  setPrefix(value: string) {
    this.parentForm.get('phone.prefix')?.setValue(value);
    this.setLengths(value);
  }

  get number() {
    return this.parentForm.get('phone.number') as FormControl;
  }

  //helper
  setLengths(value: string) {
    const country = value.slice(0, 2);
    const line = this.phoneSpecs.find(elem => elem.country === country);
    this.minLength = line!.minlength;
    this.maxLength = line!.maxlength;
  }
}
