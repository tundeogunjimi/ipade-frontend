import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../../../auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }
  intercept(authReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const whiteListedUrls = [
      `/register`,
      `/login`,
      `/confirm-registration`,
      `/booking`,
      `/meeting/i`,
      `/confirm`
    ];

    const whiteListed = whiteListedUrls.some(url => authReq.url.includes(url));
    if (whiteListed) {
      return next.handle(authReq);
    }

    const token = this.authService.getAuthToken()
    if (token) {
      authReq = authReq.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    } else {
      console.log(`Unauthorized`)
    }

    return next.handle(authReq)
  }

}
