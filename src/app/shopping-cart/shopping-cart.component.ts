import { DECREASE_CART, INCREASE_CART, REMOVE_CART } from './actions';
import { NgRedux, select } from 'ng2-redux';

import { Component } from '@angular/core';
import { IAppState } from './../store';

@Component({
  selector: 'fa-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  @select(s => s.cart.cartItems) items;
  @select(s => s.cart.cartCount) count;
  @select(s => s.cart.cartTotal) total;
  constructor(private ngRedux: NgRedux<IAppState>) { }

  onIncrease(i: number) {
    this.ngRedux.dispatch({
      type: INCREASE_CART,
      index: i
    });
  }

  onDecrease(i: number) {
    this.ngRedux.dispatch({
      type: DECREASE_CART,
      index: i
    });
  }

  onRemove(i: number) {
    this.ngRedux.dispatch({
      type: REMOVE_CART,
      index: i
    });
  }

}
