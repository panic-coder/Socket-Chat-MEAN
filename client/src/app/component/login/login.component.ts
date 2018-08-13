import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public http: HttpClient) { }

  ngOnInit() {
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordErrorMessage(){
    return this.password.hasError('required') ? "Can't be empty" :
        this.password.hasError('minlength') ? 'Wrong password' :
            '';
  }

  dashBoard(email, password){
    var user = {
      "email":email,
      "password":password
    }
    //var stringData = JSON.stringify(user);
    console.log(user);
    var link = 'http://localhost:5001/login';
      var data = this.http.post(link, user).subscribe(res => console.log('done'));
      console.log(data);
      
    this.router.navigate(['chat-dash']);
  }

  register(){
    this.router.navigate(['registration']);
  }

  

}
