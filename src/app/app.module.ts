import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { ReuErrorComponent } from './reu-error/reu-error.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    ReuErrorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCircleCheck, faCircleXmark);
  }
}
