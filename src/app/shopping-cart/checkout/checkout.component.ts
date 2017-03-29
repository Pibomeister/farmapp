import { HttpService } from './../../services/http.service';
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
  
  constructor(private ngRedux: NgRedux<IAppState>, private http: HttpService) { }

  ngOnInit() {
   
  }

  onRadio($event){
    if($event === 'paypal') this.isEditing = false;
  }

  sendOrder(){
    let orderTotal = this.ngRedux.getState().cart.cartTotal;
    let products = [];
    for(let p of this.ngRedux.getState().cart.cartItems){
      let sum = p.price * p.qty;
      products.push({
        name : p.name,
        qty: p.qty,
        price : p.price,
        sum : sum
      });
    }
    this.http.postOrder(products, orderTotal).subscribe(
      data => console.log(data)
    );
  }

}
