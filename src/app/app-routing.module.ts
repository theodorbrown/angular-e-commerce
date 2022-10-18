import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {IsLoggedInGuard} from "./guards/is-logged-in.guard";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {path: 'signup', component: RegisterFormComponent, title: 'Sign up', canActivate: [IsLoggedInGuard]},
  {path: 'signin', component: LoginFormComponent, title: 'Sign in', canActivate: [IsLoggedInGuard]},
  {path: '', component: HomePageComponent, title: 'Home page', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
