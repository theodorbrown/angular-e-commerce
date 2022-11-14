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
    console.log('init interceptor')
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //adds cookies to request headers
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      //if error occurs
      catchError((error) => {
        //Server not reached
        if (error instanceof HttpErrorResponse && error.status === 0) {
          return throwError(() => {
            return {
              server: 'Cannot reach server.'
            }
          });
        }
        //UnauthorizedException === 401 (at might be expired)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }

        //not a 0 or 401
        return throwError(() => error.error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      //if user connected
      if (this.authService.getLoginStatus()) {
        //try to refresh at + rt
        return this.authService.refresh().pipe(
          switchMap(() => {
            //success --> new at and rt
            this.isRefreshing = false;
            return next.handle(request);
          }),
          catchError((error) => {
            //error -> no new at + rt
            if (error.statusCode == '401') {
              return throwError(() => {
                return {
                  server: 'You don\'t have the right privileges'
                }
              });
            }
            this.isRefreshing = false;
            if (error.statusCode == '403') {
              this.userDirty();
              return throwError(() => {
                return {
                  server: 'Your credentials are invalid you have been logged out.'
                }
              });
            }
            return throwError(() => error);
          })
        );
      } else {
        this.userDirty();
      }
    }
    return next.handle(request);
  }

  //helper
  userDirty() {
    this.authService.removeFromLocalStorage();
    this.router.navigate(['/signin']);
  }
}


export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
