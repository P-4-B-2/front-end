import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageQuestionsComponent } from './pages/manage-questions/manage-questions.component';
import { QuestionsFormComponent } from './pages/questions-form/questions-form.component';
import { ConversationsPageComponent } from './pages/conversations-page/conversations-page.component';
import { ConversationsDetailPageComponent } from './pages/conversations-detail-page/conversations-detail-page.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'questions', component: ManageQuestionsComponent },
    { path: 'question/form', component: QuestionsFormComponent },
    { path: 'conversations', component: ConversationsPageComponent },
    { path: 'conversations/:id', component: ConversationsDetailPageComponent },
    
    
];
