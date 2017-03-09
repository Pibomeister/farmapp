import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewCardComponent } from './../account/new-card/new-card.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './success/success.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    NgbModule
  ],
  declarations: [
    CheckoutComponent,
    SuccessComponent,
    NewCardComponent
  ]
})
export class ShoppingCartModule { }
