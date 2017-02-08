import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FofComponent } from './fof/fof.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'fof', component: FofComponent },
    { path: '', pathMatch:'full', redirectTo: 'dashboard' },
    { path: '**', pathMatch:'full', redirectTo: 'fof' }
];

export const appRouting = RouterModule.forRoot(routes);