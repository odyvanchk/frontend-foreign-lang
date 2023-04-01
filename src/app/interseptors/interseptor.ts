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


// @Injectable()
// export class HttpReqInterceptor implements HttpInterceptor {
//   isRefreshing: any = false;
//   prevReq : any;
//   constructor(
//     private authService: AuthApiService, private http : HttpClient, private router: Router
// ){

// }

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
    if (!req.headers.has("Content-Type") && (req.url!=`${BASE_URL}/teachers` && req.method!= 'POST')) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && (error.status === 401 || error.status === 403)) {
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

  // private refreshAccessToken(): Observable<any> {

  //   return of(jwtToken);
  // }

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

  // const cookies = new Cookies();
  // const jwtToken = cookies.get('access');   
  // let httpHeaders = new HttpHeaders();
  // if (jwtToken && req.url !==`${BASE_URL}${USER_URL}/auth/refresh`) {
  //   httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + jwtToken);   
  // } else {
  //   if (req.url !== `${BASE_URL}${USER_URL}/auth` && 
  //       req.url !== `${BASE_URL}${USER_URL}/registration` && 
  //       req.url !== `${BASE_URL}${USER_URL}/auth/refresh`) {         
  //     let resp = {"fingerprint" :  this.authService.visitorId};
  //     this.prevReq = req;
  //     httpHeaders = httpHeaders.set('Access-Control-Allow-Credentials' , 'true').set('content-type', 'application/json');
  //     let reqA = new HttpRequest("POST",`${BASE_URL}${USER_URL}/auth/refresh`, resp, {headers:httpHeaders, withCredentials:true});
  //       next.handle(reqA).pipe(
  //        map((res:any) => {
  //           if (res.type !=0){
  //             const cookies = new Cookies();
  //             cookies.set('access', res.body.token, { path: '/', expires:new Date(Number(res.body.expTime)) });
  //             httpHeaders = httpHeaders.set("Authorization", "Bearer " + res.body.token);
  //             return next.handle(req.clone({headers: httpHeaders}))  
  //           }else {
  //             return res
  //          }                  
  //        },)
  //       );
            //               this.http.post( `${BASE_URL}${USER_URL}/auth/refresh`, resp, { withCredentials: true }).subscribe({
            //                 next: (event : any) => {
            //                   const cookies = new Cookies();
            //                   cookies.set('access', event.token, { path: '/', expires:new Date(Number(event.expTime)) });
            //                   httpHeaders = httpHeaders.set("Authorization", "Bearer " + event.token);
            //                 },
            //                 error : (_error) => {
            //                   this.router.navigate(['/login'])
            //                   return;
            //                 }
            //                 });
            //   }catch(err) {
            //   this.router.navigate(['/login'])
            // }
  //           } 
  //         }
  //  httpHeaders = httpHeaders.set('Access-Control-Allow-Credentials' , 'true').set('content-type', 'application/json');
  //  const modifiedReq = req.clone({ headers: httpHeaders});
  //   return next.handle(modifiedReq).pipe(
  //     map(res => {
  //       console.log("Passed through the interceptor in response");
  //       return res},
  //     catchError((error: any) => {
  //       if (error.status == 401 || error.status == 403) {
  //         return this.handle401Error(modifiedReq, next, error)
  //       }
  //       return error;
  //     })
  //   ));
  // }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler, err : any):Observable<any> {
//     let httpHeaders = new HttpHeaders();

//     if (request.url !== "/auth/" && err &&
//     err.status === 401 && err.error.errors.msg !== 'Refresh token is not valid') {
//     this.isRefreshing = true;
//     try {
//       let resp = {"fingerprint" :  this.authService.visitorId};

//       this.http.post( `${BASE_URL}${USER_URL}/auth/refresh`, resp, { withCredentials: true })
//       .subscribe( {
//         next: (res :any) => {
//           const cookies = new Cookies();
//           cookies.set('access', res.token, { path: '/', expires:new Date(Number(res.expTime)) });
//           httpHeaders = httpHeaders.set("Authorization", "Bearer " + res.token);
//            return next.handle(request.clone({headers: httpHeaders}));
//         },
//         error: (response) => {
//           return throwError(response);
//           this.router.navigate(['/login'])
//         }
//       });
//     } catch (_error) {
//       return throwError(_error);
//     }
// }

// if (this.isRefreshing == false ){
//       let resp = {"fingerprint" :  this.authService.visitorId};
//       this.isRefreshing = true;
//       return this.http.post( `${BASE_URL}${USER_URL}/auth/refresh`, resp, { withCredentials: true })
//       .pipe(
//         switchMap((res: any) => {
//           this.isRefreshing = false;    
//           const cookies = new Cookies();
//            cookies.set('access', res.token, { path: '/', expires:new Date(Number(res.expTime)) });
//            let httpHeaders = new HttpHeaders().set("Authorization", "Bearer " + res.token);
          
//           return next.handle(request.clone({headers: httpHeaders}));
//         }),
//         catchError((err) => {
//           return throwError(err);
//         })
//       );
//       } else {
//         return next.handle(request);
//       }

// }


