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
  
  constructor(private auth: AuthService, private router: Router){
    router.events.subscribe((val) => {
        if(val.url === '/login' || val.url === '/singup' || val.url === '/fof'){
          this.navVisible = false;
        } else {
          this.navVisible = true;
        }
    });
  }

  ngOnInit(){
    this.auth.currentUser.subscribe(
      user => this.user = user,
      err => this.user = ''
    );
  }
}
