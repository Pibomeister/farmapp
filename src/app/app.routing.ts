import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { FofComponent } from './fof/fof.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardHomeComponent },
    { path: 'dashboard/:category', component: DashboardComponent },
    { path: 'dashboard/:category/:subCategory', component: DashboardComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard], loadChildren : './account/account.module#AccountModule' },
    { path: 'activate', component: FofComponent },
    { path: '', pathMatch:'full', redirectTo: 'dashboard' },
    { path: '**', pathMatch:'full', redirectTo: 'fof' }
];

export const appRouting = RouterModule.forRoot(routes);
