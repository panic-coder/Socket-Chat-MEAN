import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000'; //Backend server url
  private socket;

  constructor() {
    this.socket = io(this.url);
    this.socket.emit('on-user',this.email);
   }
  
  email = localStorage.getItem('email');

  /**
   * 
   * @param message Sending message to backend via socket
   * @param token 
   */
  public sendMessage(message, token) {
    this.socket.emit('new-message', message, token, this.email);
  } 

  /**
   * Getting broadcasted message from server via socket
   */
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message,email) => {
            observer.next({"message":message,"email":email});
        });
    });
  }

  /**
   * Getting broadcasted online user via socket
   */
  public getOnline = () => {
    return Observable.create((observer) => {
      this.socket.on('on-user', (user) => {
        observer.next(user);
      })
    })
  }

}
