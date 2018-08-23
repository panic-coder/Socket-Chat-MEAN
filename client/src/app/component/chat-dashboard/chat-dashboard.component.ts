import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  message: string; //getting new messages
  messages: any[] = []; //pushing new messages into this array
  oldMessage; //getting old message from database
  pastMessage = []; //pushing old messages into this array
  
  constructor(private router: Router,private service: AppService,  private auth: AuthService, private chatService: ChatService) {
    /**
     * Getting old messages from database
     */
    this.service.getRequest().subscribe((data: Message[]) => {
    this.oldMessage = data;
     for(var z=0;z<this.oldMessage.message.length;z++){
      console.log(this.oldMessage.message[z]);
      this.pastMessage.push(this.oldMessage.message[z]);
    }
      
    });
    
   }

   /**
    * Sending new message to be stored in database with the token 
    */
  sendMessage(){
    var token = localStorage.getItem('token')
    this.chatService.sendMessage(this.message, token);
    this.message = '';
  }


  ngOnInit() {
    /**
     * Getting the broadcasted message
     */
    this.chatService
      .getMessages()
      .subscribe((object) => {
        var o = {
          "email":object.email,
          "message":object.message
        }
        this.messages.push(o);
      });
  }
}
