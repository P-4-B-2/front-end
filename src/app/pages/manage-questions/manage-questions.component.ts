import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Question } from '../../interfaces/question';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './manage-questions.component.html',
  styleUrl: './manage-questions.component.css'
})
export class ManageQuestionsComponent {
  questions$!: Observable<Question[]>;
  errorMessage: string = '';
  deleteId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questions$ = this.apiService.getActiveQuestions();
  }

  add() {
    this.router.navigate(['question/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['question/form'], { state: { id: id, mode: 'edit' } });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
  }

  cancelDelete() {
    this.deleteId = null;
  }

  delete() {
    if (this.deleteId !== null) {
      this.apiService.deleteQuestion(this.deleteId).subscribe({
        next: () => {
          this.getQuestions();
          this.deleteId = null;
        },
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}
