import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import {FacebookService} from "ng2-facebook-sdk";

@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: Http, private fb: FacebookService) { }


  createUser(email: string, password: string): Observable<any>{
    console.log('createuser');
    return this.http.post('http://localhost:3000/user/signup', {email, password})
      .map(res => {
        console.log(res);
        //let token = res.headers.get("x-auth");
        //localStorage.setItem('headers', JSON.stringify(token));
        return res.json();
      });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/user/login', {email, password})
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

  facebookLogin():  Observable<boolean> {
    return this.http.get('http://localhost:3000/user/login/facebook/callback')
      .map(res => {
        console.log(res.json());
        let token = res.json().token;
        localStorage.setItem('token', token);
        return res.json();
        });

  }

  registerUser(user){
    console.log('registeruser');
    return this.http.post('http://localhost:3000/user/fbuser', {user:user})
      .map(res => {
        this.currentUser.next(this.getUser());
        return res.json();
      });
  }

  logout() {
    let headers = new Headers({ 'x-auth':this.getHeaders()});
    let options = new RequestOptions({ headers: headers });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    /*this.fb.logout().then(()=>{
      console.log('fb logout succesful');
    });*/
    this.currentUser.next(false);
    //return this.http.delete('/api/users/me/token', options);
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
