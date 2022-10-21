import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //put cookies in request headers
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse && error.status === 401)
          return this.handle401Error(request, next);
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      //TODO: if user logged in
      if (true) {
        return this.authService.refresh().pipe(
          switchMap(() => {
            this.isRefreshing = false;
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            if (error.status == '403') {
              //for example refresh not matching
              //TODO: send event
              //this.eventBusService.emit(new EventData('logout', null));
            }
            return throwError(() => error);
          })
        );
      }
    }
    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
