import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  admin = environment.adminToken;
  tenant = environment.adminTenant;

  constructor(private authSrv: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        const newReq = request.clone({
          headers: request.headers
            .set('Authorization', 'Bearer ' + this.admin)
            .set('X-TENANT-ID', this.tenant),
        });

        return next.handle(newReq);
      })
    );
  }
}
