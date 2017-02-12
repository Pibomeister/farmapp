import { Observable, Subject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  private count = new Subject();
  private shoppingList = []; 
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
