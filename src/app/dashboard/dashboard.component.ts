import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http.service';
import { ShopItem } from './../models/shop-item';

@Component({
  selector: 'fa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  drugs : ShopItem[];

  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.httpService.getData()
      .subscribe(
        (data) => {
          console.log(data);
          this.drugs = data;
        },
        (error) => console.log(error)
      );
  }

  private getAverages(drugs : ShopItem[]){
    for(let drug of drugs){
      var result : number = drug.getAverageRating();
      console.log(result);
    }
  }

  

}
