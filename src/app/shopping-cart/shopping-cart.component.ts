import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
  selector: 'fa-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  items: Array<any>;
  total: number;
  constructor(private sCs: ShoppingCartService) { }

  ngOnInit() {
   this.sCs.getItems().subscribe((val)=> {
      this.items = val;
    });
    this.total = this.sCs.getTotal();
  }

}
