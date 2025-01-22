import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bench } from '../interfaces/bench';
import { Question } from '../interfaces/question';
import { Conversation } from '../interfaces/conversation';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  eclipseUrl: string = 'https://dev1.sebastiaandaniels.com/';
  // 'https://p4-frank.azurewebsites.net/api/';

  constructor(private httpClient: HttpClient) {
  }

   // Bench

   getBenches(): Observable<Bench[]> {
    return this.httpClient.get<Bench[]>(this.eclipseUrl + "benches");
  }

  getBenchId(id: number): Observable<Bench> {
    return this.httpClient.get<Bench>(this.eclipseUrl + "benches/" + id);
  }

  postBench(bench: Bench): Observable<Bench> {
    return this.httpClient.post<Bench>(this.eclipseUrl + "benches", bench);
  }

  putBench(id:number, bench: Bench): Observable<Bench> {
    return this.httpClient.put<Bench>(this.eclipseUrl + "benches/" + id, bench);
  }

  deleteBench(id: number): Observable<Bench> {
    return this.httpClient.delete<Bench>(this.eclipseUrl + "benches/" + id);
  }

  // Questions

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.eclipseUrl + "questions");
  }

  getQuestionById(id: number): Observable<Question> {
    return this.httpClient.get<Question>(this.eclipseUrl + "questions/" + id);
  }

  postQuestion(question: Question): Observable<Question> {
    return this.httpClient.post<Question>(this.eclipseUrl + "questions", question);
  }

  putQuestion(id:number, question: Question): Observable<Question> {
    return this.httpClient.put<Question>(this.eclipseUrl + "questions/" + id, question);
  }

  deleteQuestion(id: number): Observable<Question> {
    return this.httpClient.delete<Question>(this.eclipseUrl + "questions/" + id);
  }

  // Conversations

  getConversations(): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(this.eclipseUrl + "conversations");
  }

  getConversationById(id: number): Observable<Conversation> {
    return this.httpClient.get<Conversation>(this.eclipseUrl + "conversations/" + id);
  }

  postConversation(conversation: Conversation): Observable<Conversation> {
    return this.httpClient.post<Conversation>(this.eclipseUrl + "conversations", conversation);
  }

  putConversation(id:number, conversation: Conversation): Observable<Conversation> {
    return this.httpClient.put<Conversation>(this.eclipseUrl + "conversations/" + id, conversation);
  }

  deleteConversation(id: number): Observable<Conversation> {
    return this.httpClient.delete<Conversation>(this.eclipseUrl + "conversations/" + id);
  }

  // Answers

  getAnswers(): Observable<Answer[]> {
    return this.httpClient.get<Answer[]>(this.eclipseUrl + "answers");
  }

  getAnswerById(id: number): Observable<Answer> {
    return this.httpClient.get<Answer>(this.eclipseUrl + "answers/" + id);
  }
  
  postAnswer(answer: Answer): Observable<Answer> {
    return this.httpClient.post<Answer>(this.eclipseUrl + "answers", answer);
  }

  putAnswer(id:number, answer: Answer): Observable<Answer> {
    return this.httpClient.put<Answer>(this.eclipseUrl + "answers/" + id, answer);
  }

  deleteAnswer(id: number): Observable<Answer> {
    return this.httpClient.delete<Answer>(this.eclipseUrl + "answers/" + id);
  }
}
