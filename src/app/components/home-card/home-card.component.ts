import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent {
  @Input() image: string = '';
  @Input() title: string = 'Default Title';
  @Input() subtitle: string = "Default subtitle";
  @Input() buttonLink: string = '/';

}
