import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { error } from 'util';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../../Msg';
//import { CHAT } from '../chat-dashboard/chat-dashboard.component';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {
  usersOnline;
  postdata: string;
  message: Message[] ;
  public data = [] ;

    //messages = CHAT
  constructor(private router: Router, private service: AppService, private auth: AuthService, private dataShare: DataShareService) {
    //this.dataShare.myMethod(this.data);

  }
  
  ngOnInit() {}
  
  hide = true;email = new FormControl('', [Validators.required, Validators.email]);password = new FormControl('', [Validators.required, Validators.minLength(6)]);getErrorMessage() {
    return this.email.hasError('required') ?
      'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Can't be empty" : this.password.hasError('minlength') ? 'Wrong password' : '';
    
  }
  
  secureLogin(email, password) {
    var user = {
      "email": email,
      "password": password
    } //var stringData = JSON.stringify(user); console.log(user);
    
    this.service.postRequest(user, 'login').subscribe((data: any)  =>  {
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      this.usersOnline = localStorage.getItem('email');
      this.data.push(this.usersOnline);
      //this.data.unshift(localStorage.getItem('email'));
      //this.usersOnline.push(data.email);
      //localStorage.setItem('online', this.usersOnline);
      //console.log(localStorage.getItem('token'));
      console.log(this.data);
      
      var a = (this.auth.isAuthenticated());
      console.log(a);
      
      if (data != 'undefined') {
        if (data.success) {
          //console.log(data.token);
          //this.service.getRequest()
        
          this.router.navigate(['app-home']);
        } else {
          alert(data.reason)
        }
      }
    });
  }

  

  register() { 
    this.router.navigate(['registration']);
  }
}
