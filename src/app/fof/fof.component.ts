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
  title : string;
  activated : boolean;
  constructor(private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.subscription = this.route.queryParams
      .subscribe(queryParams => {
        console.log(queryParams);
        if(queryParams.hasOwnProperty('mail')){
          this.title = 'Gracias por verificar su dirección de correo';
          this.activated = true;
          this.userEmail = queryParams['mail'];
          localStorage.setItem('userEmail', this.userEmail);
        }
        else{
          this.title = 'Correo de verificación enviado';
          this.activated = false;
        }
      });
  }

}
