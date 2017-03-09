import {AccountDetailComponent} from "./account-detail.component";
import {AccountEditComponent} from "./account-edit.component";
import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {accountRouting} from "./account.routes";

@NgModule({
  declarations : [
    AccountDetailComponent,
    AccountEditComponent
  ],

  imports : [
    CommonModule,
    accountRouting
  ]
})

export class AccountModule {

}
