import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  onUser = []; //Array where online users are being saved

  constructor(private router: Router, private auth: AuthService, private service: AppService, private chatService: ChatService) { }
  /**
   * init for gettting the online users
   */
  ngOnInit() {
    this.onUser = [];
    var email = localStorage.getItem('email');
    this.chatService.getOnline().subscribe((data) => {
        this.onUser = data;
        for(var i=0;i<this.onUser.length;i++){
          if(this.onUser[i] == email){
            this.onUser.splice(i,1);
          }
        }
    })
  }

  /**
   * Removing the token from localstorage as user signout and removing it from the online users array
   */
  signout(){
    localStorage.removeItem('token');
    var email = localStorage.getItem('email')
    for(var i=0;i<this.onUser.length;i++){
      if(this.onUser[i] == email){
        this.onUser.splice(i,1);
      }
    }
    localStorage.removeItem('email');
    var a = this.auth.isAuthenticated();
    this.router.navigate(['']);
  }

}
