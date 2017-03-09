import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';

import { IAppState } from './../../store';

@Component({
  selector: 'fa-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @select(s => s.cart.cartItems) items;
  @select(s => s.cart.cartTotal) total;
  paymentType: string = 'new';
  isEditing: boolean = false;
  
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  onRadio($event){
    if($event === 'paypal') this.isEditing = false;
  }

}
