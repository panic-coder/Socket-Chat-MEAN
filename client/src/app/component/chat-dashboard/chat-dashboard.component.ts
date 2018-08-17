import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css']
})
export class ChatDashboardComponent implements OnInit {

  message: string;

  constructor(private router: Router, private auth: AuthService, private chatService: ChatService) { }

  ngOnInit() {
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
    
  }

  signout(){
    localStorage.clear();
    //console.log(localStorage.getItem('token'));
    var a = this.auth.isAuthenticated();
    console.log(a);
    
    this.router.navigate(['']);
  }

}
