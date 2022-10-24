import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {regExpCheck} from "./validators/reg-exp-check";
import {comparePasswordsValidator} from "./validators/pwd-compare";
import {EmailCheckValidator} from "./validators/email-check";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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
    phone: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
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

  select: boolean = false;

  codesArray = [
    {country: 'FR', code: 33, minlength: 9, maxlength: 9},
    {country: 'DE', code: 49, minlength: 3, maxlength: 12},
    {country: 'BE', code: 32, minlength: 8, maxlength: 10},
    {country: 'LU', code: 352, minlength: 4, maxlength: 12},
    {country: 'AT', code: 43, minlength: 4, maxlength: 13},
  ];

  optionValue: string = this.codesArray[0].country;
  phoneMaxLength: number = 0;
  phoneMinLength: number = 0;

  constructor(
    private fb: FormBuilder,
    private emailValidator: EmailCheckValidator,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const payload = {
      ...this.registerForm.value,
      phone: '+' + this.findObject() + this.phone?.value
    }
    this.authService.register(payload).subscribe(value => {
      this.router.navigate(['signin']);
      }
    )
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

  findObject() {
    const object = this.codesArray.find(element => element.country === this.optionValue);
    this.phoneMaxLength = object!.maxlength;
    this.phoneMinLength = object!.minlength;
    return object!.code;
  }
}
