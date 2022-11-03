import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {
  faAngleDown,
  faCartShopping,
  faCheck,
  faChevronDown,
  faCircleCheck,
  faCircleXmark, faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import {ReuErrorComponent} from './reu-error/reu-error.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginFormComponent} from './login-form/login-form.component';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {HomePageComponent} from './home-page/home-page.component';
import {httpInterceptorProviders} from "./interceptors/http-request.interceptor";
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PhoneWidgetComponent } from './phone-widget/phone-widget.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    ReuErrorComponent,
    LoginFormComponent,
    HomePageComponent,
    ProfilePageComponent,
    PhoneWidgetComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: "6Lff64oiAAAAAIBc93u3BZOBim7IlFvx2_IxQRGG"} as RecaptchaSettings,
    },
    httpInterceptorProviders
  ],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add icons to the library for convenient access in other components
    library.addIcons(faCircleCheck, faCircleXmark, faChevronDown, faCheck, faCartShopping, faAngleDown, faPaperclip);
  }
}
