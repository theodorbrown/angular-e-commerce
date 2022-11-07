import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {regExpCheck} from "./validators/reg-exp-check";
import {comparePasswordsValidator} from "./validators/pwd-compare";
import {EmailCheckValidator} from "./validators/email-check";
import {AuthService} from "../services/auth.service";
import {registerUser} from "../types";

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
      asyncValidators: [this.emailValidator],
      updateOn: 'blur'
    }],
    phone: this.fb.group({
      prefix: ['FR+33', Validators.required],
      number: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    }),
    password: ['', {
      validators: [Validators.required, Validators.maxLength(25), regExpCheck],
    }],
    confirm: ['', {
      validators: [Validators.required, Validators.maxLength(25)],
      updateOn: 'blur'
    }]
  }, {
    validators: comparePasswordsValidator
  });

  phoneDetails: any;

  constructor(
    private fb: FormBuilder,
    private emailValidator: EmailCheckValidator,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formValues = this.registerForm.value;
    this.authService.register({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      age: Number(formValues.age),
      phone: formValues.phone?.number,
      email: formValues.email,
      password: formValues.password,
      confirm: formValues.confirm,
    }).subscribe();
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
