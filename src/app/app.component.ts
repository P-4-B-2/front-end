import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { MenuComponent } from "./components/menu/menu.component";
import { NgClass } from '@angular/common';
import { ScrollToTopService } from './services/scroll-to-top-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MenuComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'bench-frontend';
  constructor(private scrollToTopService: ScrollToTopService) {
    // The ScrollToTopService is automatically activated through the constructor
  }
  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 0;
  }
}

