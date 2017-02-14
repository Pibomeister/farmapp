import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, Response, Jsonp } from '@angular/http';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: Http, private jsonp : Jsonp) { }


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
        localStorage.setItem('token', "JWT " + token);
        return res.json();
        })
      .map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
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
        //console.log(res);
        return res.json();
      });
  }

  logout() {
    let headers = new Headers({ 'x-auth':this.getHeaders()});
    let options = new RequestOptions({ headers: headers });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.next(false);
    //return this.http.delete('/api/users/me/token', options);
  }

  getUser() {
    var user = localStorage.getItem('user');
    return user ? JSON.parse(user) : false;
  }

  getHeaders() {
    let headers = localStorage.getItem('headers');
    return headers? JSON.parse(headers) : false;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

}
