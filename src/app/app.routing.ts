import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { FofComponent } from './fof/fof.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'fof', component: FofComponent },
    { path: '', pathMatch:'full', redirectTo: 'login' },
    { path: '**', pathMatch:'full', redirectTo: 'fof' }
];

export const appRouting = RouterModule.forRoot(routes);