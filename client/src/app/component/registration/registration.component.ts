import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  repeatPassword = new FormControl();
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Can't be empty":'';
  }

  getPasswordMatch() {
    if(this.password === this.repeatPassword){
      return this.password.hasError('required') ? 'Password Matched':'';
    } else {
      return this.password.hasError('required') ? "Password doesn't match" : '';
    }
  }

}
