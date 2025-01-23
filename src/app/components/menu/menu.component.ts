import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isMobileMenuOpen = false;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  hideMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}