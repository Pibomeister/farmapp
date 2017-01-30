import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  getData() {
    return this.http.get('http://localhost:3000/api/drugs')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
