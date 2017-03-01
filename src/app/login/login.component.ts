import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { FacebookInitParams, FacebookLoginResponse, FacebookService } from 'ng2-facebook-sdk';

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

  constructor(private auth: AuthService, private router: Router, private fb: FacebookService, private zone : NgZone) { }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '718911944831-8r7babgmpmnebfg8gbfugb7u6njuv0d5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        this.zone.run(()=>{
          let profile = googleUser.getBasicProfile();
          //console.log('Token || ' + googleUser.getAuthResponse().id_token);
          let guser = {
            id : profile.getId(),
            name : profile.getName(),
            email : profile.getEmail()
          }


          this.auth.registerGoogleUser(guser).subscribe(
            user => { if(user) this.router.navigateByUrl('/dashboard') }
          );
        })
        

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
    }, (err)=> { alert('Credenciales inválidas');} )
  }

  facebookLogin(){
            this.fb.login({scope: 'email'}).then((response: FacebookLoginResponse) =>

              {

              if(response.status === "connected"){
                this.fb.api('/me?fields=name,email', 'get', {fields: 'name,email,id', scope:'email'}).then(
                  (data: any) => {
                    let user = {
                      id : data.id,
                      name : data.name,
                      email: data.email
                    }

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
