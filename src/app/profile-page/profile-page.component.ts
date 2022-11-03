import {AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmailCheckValidator} from "../register-form/validators/email-check";
import {regExpCheck} from "../register-form/validators/reg-exp-check";
import {comparePasswordsValidator} from "../register-form/validators/pwd-compare";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailValidator],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.maxLength(25), regExpCheck]],
    confirm: ['', [Validators.required, Validators.maxLength(25)]],
    phone: this.fb.group({
      prefix: ['FR+33', Validators.required],
      number: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    }),
    age: ['', [Validators.required, Validators.min(18), Validators.max(119)]],
    profileImage: ['', [Validators.required]]
  }, {
    validators: comparePasswordsValidator
  })

  show5: boolean = true;
  show4: boolean = true;
  show6: boolean = true;
  show3: boolean = true;
  show2: boolean = true;
  show1: boolean = true;

  constructor(private fb: FormBuilder,
              private emailValidator: EmailCheckValidator) {
  }

  upload(file: HTMLInputElement) {
    if (file.files && file.files.length > 0) {
      const extractedFile = (file.files[0] as File);
      this.profileForm.get('profileImage')!.setValue(extractedFile.name);
      //TODO call back-end route
    }
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get age() {
    return this.profileForm.get('age');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get confirm() {
    return this.profileForm.get('confirm');
  }

  get phonePrefix() {
    return this.profileForm.get('phone.prefix');
  }

  get phoneNumber() {
    return this.profileForm.get('phone.number');
  }

  get phone(){
    return this.profileForm.get('phone');
  }
}
