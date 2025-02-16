import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-dismissable-alert',
  templateUrl: './dismissable-alert.component.html',
  standalone: true,
  imports: [NgClass, NgIf],
  styleUrl: './dismissable-alert.component.css'
})
  
export class DismissableAlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() message: string = 'This is an alert!';
  isVisible: boolean = true;

  dismiss() {
    this.isVisible = false;
  }
}
