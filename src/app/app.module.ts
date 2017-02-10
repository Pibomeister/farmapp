import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './dashboard/card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FofComponent } from './fof/fof.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpModule } from '@angular/http';
import { HttpService } from './services/http.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { SignupComponent } from './signup/signup.component';
import { appRouting } from './app.routing';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    FofComponent,
    CardComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,
    NgbModule.forRoot()
  ],
  providers: [
    HttpService, 
    AuthService,
    ShoppingCartService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
