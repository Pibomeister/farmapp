import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'fa-fof',
  templateUrl: './fof.component.html',
  styleUrls: ['./fof.component.scss']
})
export class FofComponent implements OnInit {

  subscription : Subscription;
  userEmail : string = '';
  constructor(private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.subscription = this.route.queryParams
      .subscribe(queryParams => {
        console.log(queryParams);
        if(queryParams.hasOwnProperty('mail')){
          this.userEmail = queryParams['mail'];
          localStorage.setItem('userEmail', this.userEmail);
        }
      });
  }

}
