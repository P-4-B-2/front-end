import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Conversation } from '../../interfaces/conversation';
import { Answer } from '../../interfaces/answer';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversations-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './conversations-page.component.html',
  styleUrl: './conversations-page.component.css'
})
export class ConversationsPageComponent implements OnInit {
  conversations$!: Observable<Conversation[]>;
  answers$!: Observable<Answer[]>;
  filteredConversations$!: Observable<Conversation[]>;
  keywords: string[] = [];
  selectedKeyword: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.conversations$ = this.apiService.getConversations();
    this.answers$ = this.apiService.getAnswers();

    this.answers$.subscribe(answers => {
      const keywordSet = new Set<string>();
      answers.forEach(answer => {
        answer.keywords.forEach(keyword => {
          const cleanedKeyword = keyword.replace(/[\[\]]/g, '');
          keywordSet.add(cleanedKeyword);
        });
      });
      this.keywords = Array.from(keywordSet);
    });

    this.filteredConversations$ = this.conversations$;
  }

  filterConversations() {
    if (!this.selectedKeyword) {
      this.filteredConversations$ = this.conversations$;
      return;
    }

    this.filteredConversations$ = combineLatest([this.conversations$, this.answers$]).pipe(
      map(([conversations, answers]) => {
        const matchingConversationIds = new Set(
          answers
            .filter(answer => 
              answer.keywords.some(keyword => 
                keyword.replace(/[\[\]]/g, '') === this.selectedKeyword
              )
            )
            .map(answer => answer.conversationId)
        );

        return conversations.filter(conversation => matchingConversationIds.has(conversation.id));
      })
    );
  }
}