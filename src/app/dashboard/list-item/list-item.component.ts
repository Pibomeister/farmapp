import { Component, Input, OnInit } from '@angular/core';

import { ADD_CART } from './../../shopping-cart/actions';
import { IAppState } from './../../store';
import { NgRedux } from 'ng2-redux';
import { ShopItem } from './../../models/shop-item';

@Component({
  selector: 'fa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() shopItem: ShopItem;
  arr: Array<number>;
  avg: number;
  aplica: boolean = false;
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.avg = this.getAverage(this.shopItem);
    this.arr = new Array(this.avg);
  }

  getAverage(shopItem: ShopItem) {
    let sum = 0;
    if (shopItem.rating.length > 0) {
      for (let i = 0; i < shopItem.rating.length; i++) {
        sum += this.shopItem.rating[i];
      }
      return Math.floor(sum / shopItem.rating.length);
    }
    else {
      return undefined;
    }
  }

  addToCart(item: ShopItem){
    this.ngRedux.dispatch({
      type: ADD_CART,
      _id: item._id,
      name: item.name,
      price:item.discount ? item.discount : item.price,
      imgUrl: item.imgUrl
    });
  }

}
