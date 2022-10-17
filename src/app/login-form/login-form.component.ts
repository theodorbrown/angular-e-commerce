import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(25)]],
    recaptcha: [null, [Validators.required]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get recaptcha() {
    return this.loginForm.get('recaptcha');
  }
}

//TODO : find a way to handle errors better
//TODO : Guards and refresh on connect ?
