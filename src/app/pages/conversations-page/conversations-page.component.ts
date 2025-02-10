import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../../interfaces/conversation';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-conversations-page',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './conversations-page.component.html',
  styleUrl: './conversations-page.component.css'
})
export class ConversationsPageComponent {
  conversations$!: Observable<Conversation[]>;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void{
    this.getConversations();
  }

  getConversations(){
    this.conversations$ = this.apiService.getConversations();
  }

}
