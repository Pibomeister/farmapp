import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  getData(classification?: string, subclass? : string) {
    let url = 'http://localhost:3000/api/drugs';
    if (classification) url += `/${classification}`;
    if (subclass) url += `/${subclass}`;
    console.log(url);
    let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/api/drugs', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUser(){
    let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
    let options = new RequestOptions({ headers: headers });
    let params = localStorage.getItem('user');
    params = params.replace(/["']/g, "");
    return this.http.get('http://localhost:3000/user/' + params, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
