import { Injectable, Injector } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      userCredential.user.getIdToken().then((token) => {
        console.log("Firebase ID Token:", token);
      });
    }).catch((error) => {
      // this.errorMessage = error.message;
    });
  }

  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  get user(): Observable<any> {
    return authState(this.auth);
  }
}