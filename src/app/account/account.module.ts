import { AccountAddressesComponent } from './account-addresses/account-addresses.component';
import { AccountBillingComponent } from './account-billing/account-billing.component';
import {AccountDetailComponent} from "./account-detail.component";
import {AccountEditComponent} from "./account-edit.component";
import { AccountHistoryComponent } from './account-history/account-history.component';
import { AccountInterestsComponent } from './account-interests/account-interests.component';
import { AccountPaymentComponent } from './account-payment/account-payment.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgModule} from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {accountRouting} from "./account.routes";

@NgModule({
  declarations : [
    AccountDetailComponent,
    AccountEditComponent,
    AccountInterestsComponent,
    AccountAddressesComponent,
    AccountPaymentComponent,
    AccountBillingComponent,
    AccountHistoryComponent
  ],

  imports : [
    CommonModule,
    FormsModule,
    accountRouting
  ]
})

export class AccountModule {

}
