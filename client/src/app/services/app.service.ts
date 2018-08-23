import { Injectable } from '@angular/core';

import { HttpResponse, HttpClient, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  link = 'http://localhost:3000/'; // link of backend server
  
  /**
   * Post request for the given relative url 
   * @param user 
   * @param url 
   */
  postRequest(user,url){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.link+url, user, {headers: reqHeader})
   
  }
  /**
   * Get request for getting the old messages
   */
  getRequest(){
      return this.http.get(this.link+'chatdash');
  }
  
}
