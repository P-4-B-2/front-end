import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bench } from '../interfaces/bench';
import { Question } from '../interfaces/question';
import { Conversation } from '../interfaces/conversation';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private eclipseUrl: string = 'https://frankdepratendebank.azurewebsites.net/api/';
  // private eclipseUrl: string = 'https://dev1.sebastiaandaniels.com/';
  // private eclipseUrl: string = 'https://localhost:7081/api/';
  // private eclipseUrl: string = 'http://localhost:5045/api/'

  constructor(private httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  getBenches(): Observable<Bench[]> {
    return this.httpClient.get<Bench[]>(this.eclipseUrl + 'benches', { headers: this.getHeaders() });
  }

  getBenchId(id: number): Observable<Bench> {
    return this.httpClient.get<Bench>(`${this.eclipseUrl}benches/${id}`, { headers: this.getHeaders() });
  }

  postBench(bench: Bench): Observable<Bench> {
    return this.httpClient.post<Bench>(this.eclipseUrl + 'benches', bench, { headers: this.getHeaders() });
  }

  putBench(id: number, bench: Bench): Observable<Bench> {
    return this.httpClient.put<Bench>(`${this.eclipseUrl}benches/${id}`, bench, { headers: this.getHeaders() });
  }

  deleteBench(id: number): Observable<Bench> {
    return this.httpClient.delete<Bench>(`${this.eclipseUrl}benches/${id}`, { headers: this.getHeaders() });
  }

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.eclipseUrl + 'questions', { headers: this.getHeaders() });
  }

  getActiveQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.eclipseUrl + 'questions/active', { headers: this.getHeaders() });
  }

  getQuestionById(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.eclipseUrl}questions/${id}`, { headers: this.getHeaders() });
  }

  postQuestion(question: Question): Observable<Question> {
    return this.httpClient.post<Question>(this.eclipseUrl + 'questions', question, { headers: this.getHeaders() });
  }

  putQuestion(id: number, question: Question): Observable<Question> {
    return this.httpClient.put<Question>(`${this.eclipseUrl}questions/${id}`, question, { headers: this.getHeaders() });
  }

  deleteQuestion(id: number): Observable<Question> {
    return this.httpClient.delete<Question>(`${this.eclipseUrl}questions/${id}`, { headers: this.getHeaders() });
  }

  getConversations(): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(this.eclipseUrl + 'conversations', { headers: this.getHeaders() });
  }

  getConversationById(id: number): Observable<Conversation> {
    return this.httpClient.get<Conversation>(`${this.eclipseUrl}conversations/${id}`, { headers: this.getHeaders() });
  }

  postConversation(conversation: Conversation): Observable<Conversation> {
    return this.httpClient.post<Conversation>(this.eclipseUrl + 'conversations', conversation, { headers: this.getHeaders() });
  }

  putConversation(id: number, conversation: Conversation): Observable<Conversation> {
    return this.httpClient.put<Conversation>(`${this.eclipseUrl}conversations/${id}`, conversation, { headers: this.getHeaders() });
  }

  deleteConversation(id: number): Observable<Conversation> {
    return this.httpClient.delete<Conversation>(`${this.eclipseUrl}conversations/${id}`, { headers: this.getHeaders() });
  }

  getAnswers(): Observable<Answer[]> {
    return this.httpClient.get<Answer[]>(this.eclipseUrl + 'answers', { headers: this.getHeaders() });
  }

  getAnswerById(id: number): Observable<Answer> {
    return this.httpClient.get<Answer>(`${this.eclipseUrl}answers/${id}`, { headers: this.getHeaders() });
  }

  getAnswersByConversationId(conversationId: number): Observable<Answer[]> {
    return this.httpClient.get<Answer[]>(`${this.eclipseUrl}answers/conversation/${conversationId}`, { headers: this.getHeaders() });
  }



  postAnswer(answer: Answer): Observable<Answer> {
    return this.httpClient.post<Answer>(this.eclipseUrl + 'answers', answer, { headers: this.getHeaders() });
  }

  putAnswer(id: number, answer: Answer): Observable<Answer> {
    return this.httpClient.put<Answer>(`${this.eclipseUrl}answers/${id}`, answer, { headers: this.getHeaders() });
  }

  deleteAnswer(id: number): Observable<Answer> {
    return this.httpClient.delete<Answer>(`${this.eclipseUrl}answers/${id}`, { headers: this.getHeaders() });
  }
}