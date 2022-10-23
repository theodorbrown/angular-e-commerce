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
import {Router} from "@angular/router";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //put cookies in request headers
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      catchError((error) => {
        //Server not reached
        if (error instanceof HttpErrorResponse && error.status === 0) {
          return throwError(() => {
            return {
              server: 'Serveur injoignable : réessayer plus tard'
            }
          });
        }
        //UnauthorizedException === 401
        if (error instanceof HttpErrorResponse && error.status === 401)
          return this.handle401Error(request, next);
        return throwError(() => error.error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      //if user connected
      if (this.authService.markUp()) {
        return this.authService.refresh().pipe(
          switchMap(() => {
            this.isRefreshing = false;
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            if (error.status == '403') {
              //for example refresh legit but not matching hash
              this.authService.ls.next(false);
              this.router.navigate(['/signin']);
            }
            return throwError(() => error);
          })
        );
      } else {
        this.authService.ls.next(false);
        this.router.navigate(['/signin']);
      }
    }
    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
