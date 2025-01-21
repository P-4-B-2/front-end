import { Injectable } from "@angular/core";
import { Auth } from '@angular/fire/auth';
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root',
  })
  export class TokenService {
    constructor(private auth: Auth) {}
  
    getIdToken(): Observable<string | null> {
        return new Observable(observer => {
          this.auth.currentUser.then(user => {
            if (user) {
              user.getIdToken().then(token => {
                observer.next(token);
                observer.complete();
              }).catch(err => observer.error(err));
            } else {
              observer.next(null);
              observer.complete();
            }
          }).catch(err => observer.error(err));
        });
      }
      
  }
  