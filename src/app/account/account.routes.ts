import {RouterModule, Routes} from "@angular/router";

import { AccountAddressesComponent } from './account-addresses/account-addresses.component';
import { AccountBillingComponent } from './account-billing/account-billing.component';
import { AccountDetailComponent } from "./account-detail.component";
import { AccountEditComponent } from "./account-edit.component";
import { AccountHistoryComponent } from './account-history/account-history.component';
import { AccountInterestsComponent } from './account-interests/account-interests.component';
import { AccountPaymentComponent } from './account-payment/account-payment.component';
import {AuthGuard} from "../auth.guard";

/**
 * Created by FAG on 19/1/2017.
 */
const ACCOUNT_ROUTES : Routes = [
  {path: '', pathMatch : 'full', redirectTo : 'main'},
  {path : 'main', component : AccountDetailComponent },
  {path : 'edit', component : AccountEditComponent},
  { path: 'interests', component: AccountInterestsComponent },
  { path: 'address', component: AccountAddressesComponent },
  { path: 'payment', component: AccountPaymentComponent },
  { path: 'billing', component: AccountBillingComponent },
  { path: 'history', component: AccountHistoryComponent }
];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
