import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Order } from './../models/order';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  getData(classification?: string, subclass? : string) {
    let url = '/api/drugs';
    if (classification) url += `/${classification}`;
    if (subclass) url += `/${subclass}`;
    console.log(url);
    return this.http.get('/api/drugs')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getProduct(pid: string){
    let url = `/api/drug/${pid}`;
    console.log(url);
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getPharmacies(){
    let url = '/api/pharmacy';
    console.log(url);
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getUser(){
    let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
    let options = new RequestOptions({ headers: headers });
    let params = localStorage.getItem('user');
    params = params.replace(/["']/g, "");
    return this.http.get('/user/' + params, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  postOrder(products:any, total:number){
    let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
    let options = new RequestOptions({ headers: headers });
    let body = new Order();
    let userid = localStorage.getItem('user');
    userid = userid.replace(/["']/g, "");
    body.userId = userid;
    body.products = products;
    body.total = total;
    return this.http.post('http://localhost:3000/order/', body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
