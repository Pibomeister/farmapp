import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';

import { AuthService } from './services/auth.service';
import { IAppState } from './store';

@Component({
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navVisible;
  user: any = false;
  @select(s => s.cart.cartCount) cartCount;
  private _noNav = ['/login', '/signup', '/fof'];

  constructor(private ngRedux: NgRedux<IAppState>,  private auth: AuthService, private router: Router) { }


  ngOnInit() {
    this.router.events
      .filter(evt => evt instanceof NavigationEnd)
      .map(val => (<NavigationEnd>val).urlAfterRedirects)
      .subscribe(url => this.navVisible = this._noNav.indexOf(url) === -1);
    this.auth.currentUser.subscribe(
      user => this.user = user,
      err => this.user = ''
    );
  }
}
