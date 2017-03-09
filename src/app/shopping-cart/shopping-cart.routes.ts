import {CanActivate, RouterModule, Routes} from "@angular/router";

import { AuthGuard } from './../auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SuccessComponent } from './success/success.component';

export const CART_ROUTES : Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'cart/checkout', component: CheckoutComponent, canActivate:[ AuthGuard] },
  { path: 'cart/success', component: SuccessComponent }
];

