import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
    //this.socket.on('new-message', (message) => {
      //console.log(message);
  //});
   }
  
  email = localStorage.getItem('email');

  public sendMessage(message, token) {
    this.socket.emit('new-message', message, token, this.email);
  } 

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message,email) => {
          console.log(email);
            observer.next({"message":message,"email":email});
            //observer.next(email);
        });
    });
  }


  // public getOldMessages = () => {
  //   return Observable.create
  // }

}
