import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants } from '../shared/constant';
import { ApiService } from './api';
import { LoginResponse } from '../models/login.response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private apis: ApiService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(Constants.AccessToken);

    // Attach access token if exists
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (
          error.status === 401 &&
          !authReq.url.includes('/auth/refresh')
        ) {
          const refreshToken = localStorage.getItem(Constants.RefreshToken);

          if (refreshToken) {
            return this.apis.refreshToken(refreshToken).pipe(
              switchMap((response: LoginResponse) => {

                if (response.isSuccess) {
                  localStorage.setItem(Constants.AccessToken, response.accessToken);
                  localStorage.setItem(Constants.RefreshToken, response.refreshToken);

                  const retryReq = authReq.clone({
                    setHeaders: {
                      Authorization: `Bearer ${response.accessToken}`
                    }
                  });

                  return next.handle(retryReq);
                }

                // Refresh failed
                this.logout();
                return throwError(() => error);
              }),
              catchError(err => {
                this.logout();
                return throwError(() => err);
              })
            );
          }

          this.logout();
        }

        return throwError(() => error);
      })
    );
  }

  private logout() {
    localStorage.removeItem(Constants.AccessToken);
    localStorage.removeItem(Constants.RefreshToken);
    this.router.navigate(['/login']);
  }
}
