import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  error = false;
  errorMessage: string;
  successMessage: string;

  errorSubscription: Subscription;
  messageSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  	this.messageSubscription = this.authService.message.subscribe(
  		(message)=>{
  			console.log(message);
  			if(message === 'Success!') {
  				this.successMessage = message;
  			}
  			else {
  				this.errorMessage = message;
  			}
  			
  		});

  	this.errorSubscription = this.authService.error.subscribe(
  		(error)=> this.error = error 
  		)
  }

  //reach out to firebase to send data and sign user up
  onSignup(form: NgForm) {
  	//retrieve email/pw from form value
  	const email = form.value.email;
  	const password = form.value.password;

  	//use auth service to signup user entered email/password
  	this.authService.signupUser(email, password);
  }

  ngOnDestroy() {
  	this.messageSubscription.unsubscribe();
  	this.errorSubscription.unsubscribe();
  }

}
