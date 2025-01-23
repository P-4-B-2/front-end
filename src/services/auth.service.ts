import { Injectable, Injector } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user.getIdToken().then((token) => {
          localStorage.setItem('authToken', token);
        });
      })
      .catch((error) => {
        console.error("Login error:", error.message);
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  get user(): Observable<any> {
    return authState(this.auth);
  }

  get isLoggedIn(): Observable<boolean> {
    return authState(this.auth).pipe(
      map((user) => !!user)
    );
  }
}
