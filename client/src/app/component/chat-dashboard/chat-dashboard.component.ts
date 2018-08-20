import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../../services/chat.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css']
})
export class ChatDashboardComponent implements OnInit {

  message: string;
  messages: string[] = [];
  email: string;
  emails: string[] = [];
  constructor(private router: Router,private service: AppService,  private auth: AuthService, private chatService: ChatService) {
    // this.chatService.getMessages().subscribe((message:string) => {
    //   this.messages.push(message);
    // })
   }
  sendMessage(){
    var token = localStorage.getItem('token')
    this.chatService.sendMessage(this.message, token);
    // this.messages.push(this.message);
    // console.log(this.messages);
    this.message = '';
  }

  signout(){
    localStorage.clear();
    //console.log(localStorage.getItem('token'));
    var a = this.auth.isAuthenticated();
    console.log(a);
    
    this.router.navigate(['']);
  }

  ngOnInit() {
    //this.email = this.service.getEmail();
    this.chatService
      .getMessages()
      .subscribe((object) => {
        this.messages.push(object.email, object.message);
        //this.emails.push(object.email);
      });
      // this.chatService.getMessages().subscribe((email) => {
      // this.email = email;
      //console.log(message)
      //console.log(email);
     // })
  }
}
