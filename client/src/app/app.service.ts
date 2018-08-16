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
  //headers: HttpHeaders;
  //options: RequestOptions;
  link = 'http://localhost:5001/';
  
  //  httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   observe: 'response' as 'response'
  // };

  // postRequest(user,url) {
    
  //    return this.http.post(this.link+url, user).subscribe(res => {
  //      //console.log(res.headers.get('token-key-name'));
  //     console.log('done');
  //    }) 
  // }

  // public postRequest(user,url){
  //   console.log(user);  
  //   let headers = new HttpHeaders({'Content-Type' : 'application/json' });
  //   let body = JSON.stringify(user);
  //   // let options = new RequestOptions({headers: headers}); 
  //   return this.http.post(this.link+url, body).map((res: Response) => res.json());
  //   }

  // posthttpdata(){
  
  // }

  postRequest(user,url){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.link+url, user, {headers: reqHeader})
    // .subscribe(
    //   (data:any) => {
    //     if(data.length){
    //       console.log(data);
          
    //     }
    //   }
    // )
  }
}
