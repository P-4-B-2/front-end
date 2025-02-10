import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Answer } from '../../interfaces/answer';
import { CommonModule } from '@angular/common';
import { Conversation } from '../../interfaces/conversation';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-conversations-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversations-detail-page.component.html',
  styleUrl: './conversations-detail-page.component.css'
})
export class ConversationsDetailPageComponent implements OnInit {
  conversationId: number = 0;
  answers$!: Observable<Answer[]>;
  answers: Answer[] = [];
  conversation!: Conversation;
  questionsMap: { [key: number]: Question } = {};
  errorMessage: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.conversationId = +params['id'];
      this.getConversationDetails();
      this.getAnswersForConversation();
    });
  }

  getConversationDetails() {
    this.apiService.getConversationById(this.conversationId).subscribe(
      (data) => {
        this.conversation = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching conversation details';
      }
    );
  }

  getAnswersForConversation() {
    this.answers$ = this.apiService.getAnswersByConversationId(this.conversationId);
    this.answers$.subscribe(
      (answers) => {
        this.answers = answers;
        const questionIds = answers.map(answer => answer.questionId);
        this.fetchQuestions(questionIds);
      },
      (error) => {
        this.errorMessage = 'Error fetching answers';
      }
    );
  }

  fetchQuestions(questionIds: number[]) {
    const requests = questionIds.map(id => this.apiService.getQuestionById(id));
    forkJoin(requests).subscribe(
      (questions) => {
        questions.forEach(question => {
          this.questionsMap[question.id] = question;
        });
      },
      (error) => {
        this.errorMessage = 'Error fetching questions';
      }
    );
  }

  goBack() {
    this.router.navigate(['/conversations']);
  }
}