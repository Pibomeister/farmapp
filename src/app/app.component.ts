import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navVisible: boolean = false;
  user: any = false;
  noHeader: Array<string> = ['/login', '/signup'];
  
  constructor(private auth: AuthService, private router: Router){
    router.events
    .map(val => val.url)
    .subscribe( url => this.navVisible = this.hasHeader(url));
  }
  
  hasHeader(route: string) : boolean {
    return this.noHeader.indexOf(route) === -1;
  }

  ngOnInit(){
    this.auth.currentUser.subscribe(
      user => this.user = user,
      err => this.user = ''
    );
  }
}
