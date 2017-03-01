import {NgModule} from "@angular/core";
import {AccountDetailComponent} from "./account-detail.component";
import {AccountEditComponent} from "./account-edit.component";
import {accountRouting} from "./account.routes";
@NgModule({
  declarations : [
    AccountDetailComponent,
    AccountEditComponent
  ],

  imports : [
    accountRouting
  ]
})

export class AccountModule {

}
