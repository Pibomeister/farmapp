import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { FacebookService } from "ng2-facebook-sdk";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject(this.getUser());

  constructor(private http: Http) { }

  private _access(url: string, payload: any): Observable<boolean | Error> {
    return this.http.post(url, payload)
      .map(res => {
        let user = res.json();
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.id));
        this.currentUser.next(this.getUser());
        return this.isLoggedIn();
      })
      .catch(err => Observable.throw(new Error(err)));
  }

  createUser(name : string, email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup', { name, email, password })
      .map(res => res.json());
  }

  secondStep(usermail : string) : Observable<any> {
    return this.http.get('http://localhost:3000/user/send/' + usermail)
      .map(res => res.json());
  }


  login(email: string, password: string): Observable<boolean> {
    return this._access('http://localhost:3000/user/login', {email, password});
  }

  registerFacebookUser(user) {
    return this._access('http://localhost:3000/user/fbuser', { user: user });
  }

  registerGoogleUser(user) {
    return this._access('http://localhost:3000/user/googleuser', { user: user });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.next(false);
  }

  getUser(): any  {
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
