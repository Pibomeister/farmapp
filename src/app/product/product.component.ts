import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../services/http.service';
import { ShopItem } from './../models/shop-item';
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'fa-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private _sub: Subscription;
  pid: string;
  product: ShopItem;
  recommendations: Array<any>;
  constructor(private _http: HttpService, private _activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this._sub = this._activatedRoute.params
    .map( params => {
      this.pid = params['pid'];
    })
    .switchMap(()=> this._http.getProduct(this.pid))
    .subscribe(data => {
      this.product = data.drug;
      this.recommendations = data.recommendations;
    },
    err => console.error(err));
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

}
