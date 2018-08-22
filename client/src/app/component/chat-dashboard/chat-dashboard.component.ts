import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../../services/chat.service';
import { AppService } from '../../services/app.service';
import { Message } from '../../Msg'

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css']
})
export class ChatDashboardComponent implements OnInit {

  message: string;
  messages: any[] = [];
  oldMessage;
  pastMessage = [];
  //console.log(messagesPast);
  i: Number=0;
  j: Number=0;
  
  constructor(private router: Router,private service: AppService,  private auth: AuthService, private chatService: ChatService) {
    this.service.getRequest().subscribe((data: Message[]) => {
      this.oldMessage = data;
     // console.log(this.oldMessage.message[0]);
     for(var z=0;z<this.oldMessage.message.length;z++){
      console.log(this.oldMessage.message[z]);
      this.pastMessage.push(this.oldMessage.message[z]);
    }
      
    });
    
   }
  sendMessage(){
    var token = localStorage.getItem('token')
    this.chatService.sendMessage(this.message, token);
    // this.messages.push(this.message);
    // console.log(this.messages);
    this.message = '';
  }


  ngOnInit() {
    //console.log(this.messagesPast);
    
    //this.email = this.service.getEmail();
    this.chatService
      .getMessages()
      .subscribe((object) => {
        var o = {
          "email":object.email,
          "message":object.message
        }
        this.messages.push(o);
        //this.emails.push(object.email);
      });
      // this.chatService.getMessages().subscribe((email) => {
      // this.email = email;
      //console.log(message)
      //console.log(email);
     // })
  }
}
