import { Injectable, Injector } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, linkWithPopup,  EmailAuthProvider, reauthenticateWithCredential, updatePassword, createUserWithEmailAndPassword, OAuthCredential, linkWithCredential, User, sendEmailVerification, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
 
      const userEmail = result.user.email;
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);
      return result.user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Google login error: ${error.message}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
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