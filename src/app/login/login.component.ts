import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f){
    let body = f.value;
    this.auth.login(body.email, body.password).subscribe((success)=> {
      if(success){
        this.router.navigateByUrl('/dashboard');    
      } else {
        alert('Credenciales inválidas');
      }
      f.reset();
    }, ()=> { alert('Credenciales inválidas');} )
  }

}
