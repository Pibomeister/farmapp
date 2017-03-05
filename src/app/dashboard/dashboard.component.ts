import * as _ from 'lodash';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { PagerService } from './../services/pager.service';
import { ShopItem } from './../models/shop-item';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'fa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private subscription2: Subscription;
  class: string;
  subClass: string;
  userEmail : string;
  displayNo = 0;
  orderNo = 0;
  drugs: ShopItem[];
  pager: any = {};
  pagedItems: ShopItem[];

  constructor(
    private httpService: HttpService, 
    private pagerService: PagerService, 
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {

      this.subscription = this.activatedRoute.params
      .map(param => {
        console.log(param);
        this.class = param['category'];
        this.subClass = param['subCategory'];
      })
      .switchMap(() => this.httpService.getData(this.class, this.subClass))
      .subscribe(data => {
        this.drugs = data;
        this.setPage(1);
      },
      error => console.log(error)
      );

      this.subscription2 = this.activatedRoute.queryParams
      .subscribe(queryParams => {
        console.log(queryParams);
        if(queryParams.hasOwnProperty('mail')){
            this.userEmail = queryParams['mail'];
            localStorage.setItem('userEmail', this.userEmail);
            this.router.navigate(['/login']);
        }
      });
  }

  private getAverages(drugs: ShopItem[]) {
    for (let drug of drugs) {
      var result: number = drug.getAverageRating();
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.drugs.length, page);
    this.pagedItems = this.drugs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  sort(key: string, order: string) {
    this.drugs = _.orderBy(this.drugs, [key], [order]);
    this.setPage(1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();

  }

}
