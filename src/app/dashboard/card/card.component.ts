import { Component, Input, OnInit } from '@angular/core';

import { ShopItem } from './../../models/shop-item';
import { ShoppingCartService } from './../../services/shopping-cart.service';

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
  constructor(private sCs: ShoppingCartService) {
    
   }

  ngOnInit() {
    this.avg = this.getAverage(this.shopItem);
    //console.log(this.avg);
    this.arr = new Array(this.avg);
    console.log(this.arr);
  }

  getAverage(shopItem : ShopItem){
     let sum = 0;
        if(shopItem.rating.length > 0){
            for(let i = 0; i < shopItem.rating.length; i++){
                sum+= this.shopItem.rating[i];
            }
            //console.log('sum', sum);
            return Math.floor(sum / shopItem.rating.length);
        }

        else{
            return undefined;
        }
  }

  addToCart(item: ShopItem){
    console.log('algo');
    this.sCs.addToCart({
      name: item.name,
      price:item.discount,
      qty: 1,
      imgSrc: item.imgUrl
    });
  }

}
