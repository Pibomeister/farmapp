import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacebookInitParams, FacebookLoginResponse, FacebookLoginStatus, FacebookService } from 'ng2-facebook-sdk';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
declare const gapi: any;
@Component({
  selector: 'fa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
//declare const gapi: any;
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService, private router: Router, private fb: FacebookService) { }

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: '718911944831-8r7babgmpmnebfg8gbfugb7u6njuv0d5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      that.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        //console.log('Token || ' + googleUser.getAuthResponse().id_token);
        let guser = {
          id : profile.getId(),
          name : profile.getName(),
          email : profile.getEmail()
        }

        console.log('user auth google successful', guser);

        that.auth.registerGoogleUser(guser).subscribe(
          user => { if(user) that.router.navigateByUrl('/dashboard') }
        );

      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
      this.googleInit();
  }

  ngOnInit() {
    let fbParams: FacebookInitParams = {
                                   appId: '287041178379781',
                                   xfbml: true,
                                   cookie : true,
                                   version: 'v2.0'
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
            this.fb.login({scope: 'email'}).then((response: FacebookLoginResponse) =>

              {console.log(response);

              if(response.status === "connected"){
                this.fb.api('/me?fields=name,email', 'get', {fields: 'name,email,id', scope:'email'}).then(
                  (data: any) => {
                    console.log('DATA', data);
                    let user = {
                      id : data.id,
                      name : data.name,
                      email: data.email
                    }
                    console.log(user);
                    this.auth.registerFacebookUser(user).subscribe(
                      user => { if(user) this.router.navigateByUrl('/dashboard') }
                    );
                  }
                );

              }

            }
            ,(error: any) => console.error(error)
          );
      }
    //});

  //}

}
