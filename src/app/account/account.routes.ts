import {Routes, RouterModule} from "@angular/router";
import { AccountEditComponent } from "./account-edit.component";
import { AccountDetailComponent } from "./account-detail.component";
import {AuthGuard} from "../auth.guard";
/**
 * Created by Farid on 19/1/2017.
 */
const ACCOUNT_ROUTES : Routes = [
  {path: '', pathMatch : 'full', redirectTo : 'main'},
  {path : 'main', component : AccountDetailComponent },
  {path : 'edit', component : AccountEditComponent}

];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
