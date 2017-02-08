import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isExpanded = false;
  cartCount: number;
  constructor(private sCs: ShoppingCartService) {}
   

  ngOnInit() {
     this.sCs.getCount().subscribe(val => {
       this.cartCount = val;
     });
     this.sCs.updateCount();
  }

}
