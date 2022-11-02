import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(25)]],
    recaptcha: [null, [Validators.required]]
  })

  loginError = '';

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginError = '';

    this.authService.login({
      email: this.email!.value!,
      password: this.password!.value!
    }).subscribe({
      error: err => {
        if (err.info)
          this.loginError = err.info;
        if (err.lockUntilInfo && err.loginAttemptsInfo)
          this.loginError = 'Account locked until: ' + new Date(err.lockUntilInfo).toLocaleTimeString('fr-FR') + '. Number of attempts: ' + err.loginAttemptsInfo + '. Maximum attempts allowed are 5.';
        if(err.server)
          this.loginError = err.server;
      }
    })
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
