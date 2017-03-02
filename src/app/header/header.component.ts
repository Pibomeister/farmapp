import { Component, Input } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() user: string;
  @Input() cartCount: number;
  isExpanded = false;
  constructor(private auth: AuthService, private router: Router) { }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
