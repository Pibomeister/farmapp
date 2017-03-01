import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navVisible;
  user: any = false;
  private _noNav = ['/login', '/signup', '/fof'];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter(evt => evt instanceof NavigationEnd)
      .map(val => (<NavigationEnd>val).urlAfterRedirects)
      .subscribe(url => this.navVisible = this._noNav.indexOf(url) === -1);
    this.auth.currentUser.subscribe(
      user => this.user = Object.assign({}, user),
      err => this.user = ''
    );
  }
}
