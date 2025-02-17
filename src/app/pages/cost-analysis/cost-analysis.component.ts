import { Component } from '@angular/core';
import { DismissableAlertComponent } from "../../components/dismissable-alert/dismissable-alert.component";
import { Observable } from 'rxjs';
import { Conversation } from '../../interfaces/conversation';
import { Answer } from '../../interfaces/answer';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-analysis',
  standalone: true,
  imports: [DismissableAlertComponent],
  templateUrl: './cost-analysis.component.html',
  styleUrl: './cost-analysis.component.css'
})
export class CostAnalysisComponent {

  conversations$!: Observable<Conversation[]>;
  answers$!: Observable<Answer[]>
  totalConversations: number = 0;
  totalAnswers: number = 0;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getConversations();
    this.getAnswers();
  }

  getConversations() {
    this.conversations$ = this.apiService.getConversations();
    
    // Subscribe and get the count
    this.conversations$.subscribe({
      next: (conversations) => {
        this.totalConversations = conversations.length;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch conversations';
        console.error(error);
      }
    });
  }

  getAnswers() {
    this.answers$ = this.apiService.getAnswers();

    // Subscribe and get the count
    this.answers$.subscribe({
      next: (answers) => {
        this.totalAnswers = answers.length;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch answers';
        console.error(error);
      }
    });
  }
}
