import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private _http: Http) { }


  createUser(email: string, password: string): Observable<any> {
    return this._http.post('http://localhost:3000/user/signup', { email, password })
      .map(res => {
        return res.json();
      });
  }

  private _access(url: string, payload: any): Observable<boolean> {
    return this._http.post(url, payload)
      .map(res => {
        let token = res.json().token;
        localStorage.setItem('token', token);
        return res.json();
      }).map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user.id));
          this.currentUser.next(this.getUser());
        }
        return !!user;
      });
  }

  login(email: string, password: string): Observable<boolean> {
    return this._access('http://localhost:3000/user/login', {email, password});
  }

  registerFacebookUser(user) {
    return this._access('http://localhost:3000/user/fbuser', { user: user });
  }

  registerGoogleUser(user) {
    return this._access('http://localhost:3000/user/googleuser', {user: user});      
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.next(false);
  }

  getUser() {
    var user = localStorage.getItem('user');
    return user ? user : false;
  }

  getHeaders(): Headers | boolean {
    let headers = localStorage.getItem('headers');
    return headers ? JSON.parse(headers) : false;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

}
