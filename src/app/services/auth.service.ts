import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import {FacebookService} from "ng2-facebook-sdk";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: Http, private fb: FacebookService) { }


  createUser(email: string, password: string): Observable<any>{
    return this.http.post('http://localhost:3000/user/signup', {email, password})
      .map(res => {
        //let token = res.headers.get("x-auth");
        //localStorage.setItem('headers', JSON.stringify(token));
        return res.json();
      });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/user/login', {email, password})
      .map(res => {
        let token = res.json().token;
        localStorage.setItem('token', token);
        return res.json();
        })
      .map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user.id));
          this.currentUser.next(this.getUser());
        }
        return !!user;
      });
  }

  facebookLogin():  Observable<boolean> {
    console.log('facebooklogin');
    return this.http.get('http://localhost:3000/user/login/facebook/callback')
       .map(res => {
        console.log(res.json());
        let token = res.json().token;
        localStorage.setItem('token', token);
        return res.json();
        })
      .map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user.id));
          this.currentUser.next(this.getUser());
        }
        return !!user;
      });

  }

  registerFacebookUser(user){
    console.log('registerFBUser');
    return this.http.post('http://localhost:3000/user/fbuser', {user:user})
      .map(res => {
        console.log(res.json());
        let token = res.json().token;
        localStorage.setItem('token', token);
        return res.json();
        }).map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user.id));
          this.currentUser.next(this.getUser());
        }
        return !!user;
      });
  }

  registerGoogleUser(user){
    console.log('registerGoogleUser');
    return this.http.post('http://localhost:3000/user/googleuser', {user:user})
      .map(res => {
        console.log(res.json());
        let token = res.json().token;
        localStorage.setItem('token', token);
        return res.json();
      }).map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user.id));
          this.currentUser.next(this.getUser());
        }
        return !!user;
      });
  }

  logout() {
    let headers = new Headers({ 'x-auth':this.getHeaders()});
    let options = new RequestOptions({ headers: headers });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.next(false);
  }

  getUser() {
    var user = localStorage.getItem('user');
    return user ? user : false;
  }

  getHeaders() {
    let headers = localStorage.getItem('headers');
    return headers? JSON.parse(headers) : false;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

}
