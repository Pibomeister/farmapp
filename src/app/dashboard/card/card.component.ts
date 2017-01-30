import { ShopItem } from './../../models/shop-item';
import { Component, OnInit, Input } from '@angular/core';

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
  constructor() {
    
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

}
