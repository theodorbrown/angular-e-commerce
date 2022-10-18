import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token = localStorage.getItem('access_token');

    if(access_token){
      const cloned = request.clone({ headers: request.headers.set("Authorization", "Bearer " + access_token)});
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
