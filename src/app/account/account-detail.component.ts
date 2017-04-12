import { Component, OnInit } from '@angular/core';

import {HttpService} from "../services/http.service";

@Component({
  selector: 'fa-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  userInfo = {};
  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.httpService.getUser().subscribe((user) => {
      this.userInfo = user;
    });
  }



}
