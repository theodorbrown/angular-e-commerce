import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {IsLoggedOutGuard} from "./guards/is-logged-out.guard";
import {HomePageComponent} from "./home-page/home-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {IsLoggedInGuard} from "./guards/is-logged-in.guard";

const routes: Routes = [
    {path: '', component: HomePageComponent, title: 'Welcome Page'},
    {path: 'signup', component: RegisterFormComponent, title: 'Sign up', canActivate: [IsLoggedOutGuard]},
    {path: 'signin', component: LoginFormComponent, title: 'Sign in', canActivate: [IsLoggedOutGuard]},
    {path: 'profile', component: ProfilePageComponent, title: 'Profile', canActivate: [IsLoggedInGuard]},
    {path: '**', redirectTo: ''}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
