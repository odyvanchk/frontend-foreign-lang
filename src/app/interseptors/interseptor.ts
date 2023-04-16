import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Cookies from "universal-cookie";
import { BASE_URL, USER_URL } from "../env";
import { AuthApiService } from "../service/AuthApiService";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of, finalize } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
        private authService: AuthApiService, private router: Router
    ){
    
    }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(req.url==`${BASE_URL}/teachers` && req.method== 'POST')) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && (error.status === 401 || error.status === 403) && (!error.url?.includes("auth"))) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.authService.updateFromRefresh().pipe(
              switchMap((res: any) => {
                const cookies = new Cookies();
                cookies.set('access', res.token, { path: '/', expires:new Date(Number(res.expTime)) });
                this.refreshTokenSubject.next(true);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        } else {
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }


  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const cookies = new Cookies();
    const jwtToken = cookies.get('access'); 
    if (!jwtToken) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + jwtToken)
    });
  }
}
