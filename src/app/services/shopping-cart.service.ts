import { Observable, Subject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  private count = new Subject();
  private shoppingList = [
    {
      name: "Item 1",
      price: 22,
      qty: 2, 
      imgSrc: "http://pornsexerotica.com/hardx//wp-content/uploads/sites/9/nggallery/mia-malkova-massive-anal-action/Mia-Malkova-Massive-Anal-Action4.jpg"
    },
    {
      name: "Item 2",
      price: 50,
      qty: 1, 
      imgSrc: "http://hardxxxerotica.com/porn-pros//wp-content/uploads/sites/4/nggallery/eva-lovia-fucked-after-massage/Eva-Lovia-fucked-after-massage9.jpg"
    },
    {
      name: "Item 3",
      price: 15,
      qty: 5, 
      imgSrc: "http://hw02.images.famedownload.com/photo_set/59841/previews/59841_1.jpg"
    }
  ]; 
  constructor() { 
    this.count.next(this.shoppingList.length);
  }

  getCount(): Subject<number>{
    return this.count;
  }

  getItems(): Observable<any[]> {
    return new Observable(observer => {
    observer.next(this.shoppingList);
    });
  }

  updateCount() : void {
    this.count.next(this.shoppingList.length);
  }

  getTotal(): number {
    return this.shoppingList.reduce( (total, item) =>  total + (item.price * item.qty), 0);
  }

  addToCart(item: any): void {
      this.shoppingList.push(item);
      this.updateCount();
  } 

}
