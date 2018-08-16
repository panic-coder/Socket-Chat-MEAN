import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
@Injectable()
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private service: AppService) { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Can't be empty" :
      this.password.hasError('minlength') ? 'Minimum 6 characters' : 
        '';
  }

  getPasswordMatch() {
      return this.repeatPassword.hasError('required') ? "'Can't be empty" :
        this.repeatPassword.hasError('minlength') ? 'Minimum 6 characters' :
         '';
  }

  getValues(email, password, repeatPassword){
    console.log(email+" "+password+" "+repeatPassword);
    var user = {
      "email":email,
      "password":password
    }
    //var data = JSON.stringify(user);
    console.log(user);
    
    if(password == repeatPassword){
      console.log('Success');
      this.service.postRequest(user,'register');
      this.router.navigate(['']);
    } else {
        alert('Failed to match password ')
    }
    
   }

}
