import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {regExpCheck} from "./validators/reg-exp-check";
import {comparePasswordsValidator} from "./validators/pwd-compare";
import {EmailCheckValidator} from "./validators/email-check";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

  registerForm = this.fb.group({
    firstName: ['', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      updateOn: 'blur'
    }],
    lastName: ['', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      updateOn: 'blur'
    }],
    age: ['', {
      validators: [Validators.required, Validators.min(18), Validators.max(119)],
      updateOn: 'blur'
    }],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: this.emailValidator,
      updateOn: 'blur'
    }],
    phone: ['', {
      validators: Validators.required,
      updateOn: 'blur'
    }],
    password: ['', {
      validators: [Validators.required, Validators.maxLength(25), regExpCheck()],
    }],
    confirm: ['', {
      validators: [Validators.required, Validators.maxLength(25)],
      updateOn: 'blur'
    }]
  }, {
    validators: comparePasswordsValidator
  });

  constructor(private fb: FormBuilder, private emailValidator: EmailCheckValidator) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirm() {
    return this.registerForm.get('confirm');
  }
}
