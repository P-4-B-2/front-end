import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-questions-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './questions-form.component.html',
  styleUrl: './questions-form.component.css'
})
export class QuestionsFormComponent {

  isAdd: boolean = false;
  isEdit: boolean = false;
  Id: number = 0;

  question: Question = { id: 0, text: '', orderNumber: 1 };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private router:Router, private apiService:ApiService){
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit'
    this.Id = +state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.Id != null && this.Id > 0) {
      this.apiService.getQuestionById(this.Id).subscribe(result => {
        this.question = result;
      });
    } 

  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.apiService.postQuestion(this.question).subscribe({
        next: (v) => this.router.navigateByUrl("/questions"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.apiService.putQuestion(this.Id, this.question).subscribe({
        next: (v) => this.router.navigateByUrl("/questions"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

}
