import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { Question } from '../../interfaces/question';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CommonModule],
  styleUrls: ['./manage-questions.component.css'],
})
export class ManageQuestionsComponent implements OnInit {
  questions: Question[] = [];
  errorMessage: string = '';
  deleteId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.apiService.getActiveQuestions().subscribe({
      next: (questions) => {
        this.questions = questions.sort((a, b) => a.orderNumber - b.orderNumber);
      },
      error: (e) => (this.errorMessage = e.message),
    });
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
          this.errorMessage = ''; 
        },
        error: (e) => {
          console.error('Error deleting question:', e);
          this.errorMessage = 'There was an error deleting the question.';
        },
      });
    }
  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.questions.forEach((q, index) => {
      q.orderNumber = index + 1;
    });

    const updateRequests = this.questions.map((q) =>
      this.apiService.putQuestion(q.id, q)
    );

    forkJoin(updateRequests).subscribe({
      error: (e) => (this.errorMessage = e.message),
    });
  }

  trackById(index: number, question: Question) {
    return question.id;
  }
}
