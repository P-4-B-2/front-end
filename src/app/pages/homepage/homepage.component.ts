import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { HomeCardComponent } from "../../components/home-card/home-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, CommonModule, HomeCardComponent, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isMobileMenuOpen = false;
  isLoggedIn$!: Observable<boolean>;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  get isLoginDisabled(): boolean {
    return !(this.email && this.password);
  }

  async login() {
    try {
      const user = await this.authService.loginWithEmail(this.email, this.password);
      console.log('Logged in:', user);
    } catch (error) {
      // console.error('Login failed:', error.message);
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(
      () => this.router.navigate(['/']),
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
