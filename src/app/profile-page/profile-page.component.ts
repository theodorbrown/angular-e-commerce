import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmailCheckValidator} from "../register-form/validators/email-check";
import {regExpCheck} from "../register-form/validators/reg-exp-check";
import {comparePasswordsValidator} from "../register-form/validators/pwd-compare";
import {SharedPhoneDetailsService} from "../services/shared-phone-details.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

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
    phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(119)]],
    profileImage: ['', [Validators.required]]
  }, {
    validators: comparePasswordsValidator
  })

  phoneDetails: any;

  //TODO : Fill form with back-end user info

  constructor(private fb: FormBuilder, private emailValidator: EmailCheckValidator, private sharedPhoneDetailsService: SharedPhoneDetailsService) {
  }

  ngOnInit(): void {
    this.sharedPhoneDetailsService.phoneDetails$.subscribe(phoneDetails => {
      this.phoneDetails = phoneDetails;
    })

    let data = {
      firstName: 'Theodor',
      lastName: 'Brown',
      email: 'theodor.brown01@gmail.com',
      password: 'Theodu54$P',
      phone: 'LU+35261305083399',
      age: 23,
      profileImage: 'user-default.pdf'
    }

    this.profileForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirm: '',
      phone: data.phone,
      age: String(data.age),
      profileImage: data.profileImage
    })
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

  get phone() {
    return this.profileForm.get('phone');
  }
}
