import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { error } from 'util';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../../Msg';

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

  constructor(private router: Router, private service: AppService, private auth: AuthService) { }
  
  ngOnInit() {}
  
  hide = true; //Hide and show password

  email = new FormControl('', [Validators.required, Validators.email]); // email validation

  /**
   * Password validation
   */
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  
  /**
   * Gets mail error message
   */
  getErrorMessage() {
    return this.email.hasError('required') ?
      'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  /**
   * Gets password error message
   */
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Can't be empty" : this.password.hasError('minlength') ? 'Wrong password' : '';
  }
  
  /**
   * Login after validating the data and checking the database whether the user exists or not
   * @param email 
   * @param password 
   */
  secureLogin(email, password) {
    var user = {
      "email": email,
      "password": password
    }
    
    this.service.postRequest(user, 'login').subscribe((data: any)  =>  {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      this.usersOnline = localStorage.getItem('email');
      this.data.push(this.usersOnline);
      var a = (this.auth.isAuthenticated());
      if (data != 'undefined') {
        if (data.success) {
          this.router.navigate(['app-home']);
        } else {
          alert(data.reason)
        }
      }
    });
  }

/**
 * Goes to registration page
 */
  register() { 
    this.router.navigate(['registration']);
  }
}
