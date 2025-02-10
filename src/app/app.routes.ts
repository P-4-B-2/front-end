import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageQuestionsComponent } from './pages/manage-questions/manage-questions.component';
import { BenchLocationComponent } from './pages/bench-location/bench-location.component';
import { QuestionsFormComponent } from './pages/questions-form/questions-form.component';
import { ConversationsPageComponent } from './pages/conversations-page/conversations-page.component';
import { ConversationsDetailPageComponent } from './pages/conversations-detail-page/conversations-detail-page.component';
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'conversations', component: ConversationsPageComponent, canActivate: [AuthGuard] },
    { path: 'conversations/:id', component: ConversationsDetailPageComponent, canActivate: [AuthGuard] },
    { path: 'questions', component: ManageQuestionsComponent, canActivate: [AuthGuard] },
    { path: 'question/form', component: QuestionsFormComponent, canActivate: [AuthGuard] },
    { path: 'bench', component: BenchLocationComponent, canActivate: [AuthGuard] },
];
