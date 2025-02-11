import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  get isLoginDisabled(): boolean {
    return !(this.email && this.password);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(
      () => this.router.navigate(['/']),
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  async login() {
    try {
      const user = await this.authService.loginWithEmail(this.email, this.password);
      console.log('Logged in:', user);
    } catch (error) {
      // console.error('Login failed:', error.message);
    }
  }
}