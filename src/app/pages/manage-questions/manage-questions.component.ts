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

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/category/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/category/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (v) => this.getCategories(),
      error: (e) => this.errorMessage = e.message
    });
  }
}

