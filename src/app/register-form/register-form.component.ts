import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

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
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(25)],
      updateOn: 'blur'
    }]
  }, {
    validators: comparePasswordsValidator
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm);
  }

  get firstName(){
    return this.registerForm.get('firstName');
  }

  get lastName(){
    return this.registerForm.get('lastName');
  }

  get age(){
    return this.registerForm.get('age');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get phone(){
    return this.registerForm.get('phone');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get confirm(){
    return this.registerForm.get('confirm');
  }
}

export const comparePasswordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirm');
  return password && confirm && password.value !== confirm.value ? {hasToMatch: true} : null;
};

export function regExpCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let errors = {
      has2up: true,
      hasSymbol: true,
      has2Digit: true,
      has3Lo: true,
      is8Long: true
    };

    const has2Up: RegExp = new RegExp('[A-Z].*[A-Z]');
    const res = has2Up.test(control.value);
    if (res)
      errors.has2up = false;

    const hasSymbol: RegExp = new RegExp('[!@#$&*]');
    const res2 = hasSymbol.test(control.value);
    if (res2)
      errors.hasSymbol = false;

    const has2Digit: RegExp = new RegExp('[0-9].*[0-9]');
    const res3 = has2Digit.test(control.value);
    if (res3)
      errors.has2Digit = false;

    const has3Lo: RegExp = new RegExp('[a-z].*[a-z].*[a-z]');
    const res4 = has3Lo.test(control.value);
    if (res4)
      errors.has3Lo = false;

    const is8Long: RegExp = new RegExp('.{8}');
    const res5 = is8Long.test(control.value);
    if (res5)
      errors.is8Long = false;

    return errors;
  };
}
