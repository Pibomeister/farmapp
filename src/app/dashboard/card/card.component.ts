import { Component, Input, OnInit } from '@angular/core';

import { ADD_CART } from './../../shopping-cart/actions';
import { IAppState } from './../../store';
import { NgRedux } from 'ng2-redux';
import { ShopItem } from './../../models/shop-item';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() shopItem: ShopItem;
  arr : Array<number>;
  avg : number;
  aplica : boolean = false;
  constructor(private httpService : HttpService,
              private router : Router,
              private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.avg = this.getAverage(this.shopItem);
    this.arr = new Array(this.avg);
  }

  getAverage(shopItem : ShopItem){
     let sum = 0;
        if(shopItem.rating.length > 0){
            for(let i = 0; i < shopItem.rating.length; i++){
                sum+= this.shopItem.rating[i];
            }
            return Math.floor(sum / shopItem.rating.length);
        }
        else{
            return undefined;
        }
  }

  getItemPrice(item : ShopItem){
    return item.price * (1 - (item.discount/100));
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

  showOnMap(id:string){
    this.router.navigate(['map', id]);
  }

}
