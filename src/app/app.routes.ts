import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageQuestionsComponent } from './pages/manage-questions/manage-questions.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'questions', component: ManageQuestionsComponent },
    { path: 'question/form', component: QuestionsFormComponent },
    
];
