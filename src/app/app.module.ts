import { DevToolsExtension, NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, INITIAL_STATE, rootReducer } from './store';
import { NgModule, isDevMode } from '@angular/core';

import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './dashboard/card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { FacebookService } from 'ng2-facebook-sdk';
import { FofComponent } from './fof/fof.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpModule } from '@angular/http';
import { HttpService } from './services/http.service';
import { ListItemComponent } from './dashboard/list-item/list-item.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerComponent } from './dashboard/pager/pager.component';
import { PagerService } from './services/pager.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { SignupComponent } from './signup/signup.component';
import { appRouting } from './app.routing';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    FofComponent,
    CardComponent,
    ShoppingCartComponent,
    ListItemComponent,
    AccountComponent,
    PagerComponent,
    DashboardHomeComponent,
    ProductComponent  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    NgbModule.forRoot(),
    ShoppingCartModule,
    appRouting  
  ],
  providers: [
    HttpService,
    AuthService,
    AuthGuard,
    PagerService,
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension
  ) {
    let enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
