import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: Auth) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.auth.currentUser).pipe(
          switchMap(user => {
            if (user) {
              return from(user.getIdToken()).pipe(
                switchMap(token => {
                  const clonedRequest = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  console.log(token);
                  return next.handle(clonedRequest);
                })
              );
            }
            return next.handle(req);
          })
        );
      }
  }