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
              server: 'Serveur injoignable : réessayer plus tard'
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
            if (error.status == '401') {
              //TODO: What if ok new at and rt but resource still 401 Unauthorized?
              console.log('new at and rt but 401?');
            }
            this.isRefreshing = false;
            if (error.status == '403') {
              //for example refresh legit but not matching hash
              this.userDirty();
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
