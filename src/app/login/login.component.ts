import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookLoginStatus } from 'ng2-facebook-sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'fa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private fb: FacebookService) { }

  ngOnInit() {
    let fbParams: FacebookInitParams = {
                                   appId: '287041178379781',
                                   xfbml: true,
                                   cookie : true,
                                   version: 'v2.6'
                                   };
    this.fb.init(fbParams);
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
    }, (err)=> { console.log(err); alert('Credenciales inválidas');} )
  }

  facebookLogin(){

    this.fb.getLoginStatus().then((value: FacebookLoginStatus) => {
      if(value.status === "connected"){
          this.fb.api('/me', 'get', {fields: 'id,name,email'}).then(
            (data: any) => {
              let user = {
                id : data.id,
                name : data.name,
                email: data.email
              }
              console.log(user);
              this.auth.registerUser(user).subscribe((user) => {
                console.log(user);
                localStorage.setItem('user', user.id);
                localStorage.setItem('token', user.token);
                //this.auth.currentUser.next(this.auth.getUser());
                this.router.navigateByUrl('/dashboard');
              });
            }
          );

      }
      else{
            this.fb.login().then((response: FacebookLoginResponse) =>

              {console.log(response);

              if(response.status === "connected"){
                localStorage.setItem('user', response.authResponse.userID);
                let token = response.authResponse.accessToken
                localStorage.setItem('token', token);
                this.fb.api('/me', 'get', {fields: 'id,name,email'}).then(
                  (data: any) => {
                    let user = {
                      id : data.id,
                      name : data.name,
                      email: data.email,
                      token: token
                    }
                    console.log(user);
                    this.auth.registerUser(user).subscribe((user) => {
                      console.log(user);
                    });
                  }
                );
                this.router.navigateByUrl('/dashboard');
              }

            }
            ,(error: any) => console.error(error)
          );
      }
    });

  }

}
