import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  getData() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/api/drugs', options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
