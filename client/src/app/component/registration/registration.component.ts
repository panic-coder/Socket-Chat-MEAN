import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

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

  email = new FormControl('', [Validators.required, Validators.email]); //Email validation
  password = new FormControl('', [Validators.required, Validators.minLength(6)]); //Password validation
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(6)]); //repeat password validation

  /**
   * Getting email error message
   */
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  /**
   * Getting password error message
   */
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Can't be empty" :
      this.password.hasError('minlength') ? 'Minimum 6 characters' : 
        '';
  }

  /**
   * Getting confirm password error message
   */
  getPasswordMatch() {
      return this.repeatPassword.hasError('required') ? "'Can't be empty" :
        this.repeatPassword.hasError('minlength') ? 'Minimum 6 characters' :
         '';
  }

  /**
   * Getting values and sending it to backend
   * @param email 
   * @param password 
   * @param repeatPassword 
   */
  getValues(email, password, repeatPassword){
    console.log(email+" "+password+" "+repeatPassword);
    var user = {
      "email":email,
      "password":password
    }
    console.log(user);
    
    if(password == repeatPassword){
      this.service.postRequest(user,'register').subscribe((data:any) => {
        console.log(data);
        if(data.success){
          this.router.navigate(['']);
        } else {
          alert('Something went wrong');
        }
      })
    } else {
        alert('Failed to match password ')
    }
   }

}
