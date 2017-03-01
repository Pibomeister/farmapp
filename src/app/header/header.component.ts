import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ShoppingCartService } from './../services/shopping-cart.service';
import {AuthService} from './../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() user: string;
  isExpanded = false;
  cartCount: number;
  constructor(private sCs: ShoppingCartService, private auth : AuthService, private router: Router) {}
   

  ngOnInit() {
     this.sCs.getCount().subscribe(val => {
       this.cartCount = val;
     });
     this.sCs.updateCount();
  }

  onLogout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
