import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from "../services/http.service";
import { Subscription } from "rxjs/Rx";
import {ShopItem} from "../models/shop-item";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  centerLat: number = 19.4199487;
  centerLng: number = -99.1754672;
  zoom : number = 10;
  pharmacies = [];
  drug : any = {
    "_id": "7501023108856",
    "name": "CINTA MICRO BLANCO H 2.5X5.1M",
    "substance": "NancyName",
    "price": 11.96,
    "discount": 18,
    "locationMode" : true,
    "imgUrl": "/images/7501033923173.jpg",
    "rating" : []
  }
  constructor(private httpService : HttpService, private route : ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.map(params => params['id'])
      .switchMap(id => this.httpService.getProduct(id))
      .subscribe((product)=> {
        product.locationMode = true;
        this.drug = product;
        this.pharmacies = product.pharmacies;
      });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  setZoom(){
    this.zoom += 1;
  }

  centerPharmacy(event, pharmacy){
    event.stopPropagation();
    this.centerLat = pharmacy.lat;
    this.centerLng = pharmacy.lng;
    this.zoom = 18;
  }

}
