import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { error } from 'util';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {
  postdata: string;
  
  constructor(private router: Router, private service: AppService, private auth: AuthService) {}
  
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
      //console.log(localStorage.getItem('token'));
      
      var a = (this.auth.isAuthenticated());
      console.log(a);
      
      if (data != 'undefined') {
        if (data.success) {
          //console.log(data.token);
          this.router.navigate(['chatdash']);
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
