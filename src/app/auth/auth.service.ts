//import all and use firebase alias
import * as firebase from 'firebase';

import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	//this token is needed to confirm user is logged in and able to save and fetch recipes.
	//this will be set on signin in the response and then used in getToken()..
	//NOTE: research better ways to handle this in the event of expired tokens.
	token: string;

	message = new Subject<string>();
	error = new Subject<boolean>();

	//inject the router for redirecting logins,logouts,etc.
	constructor(private router: Router) {}

	//expect email and password - signs up user
	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(
			()=> {
			this.message.next('Success!');
			console.log(this.message);
			this.error.next(false);
		    }
		)
		//is a promise, so could use a then block here, too; catch is used for simply catching errors
		.catch(
			//can be modified for proper error handling, where error is displayed to user
			(error)=> {
				this.message.next(error.message);
				this.error.next(true);
			}
		);
	}

	//also expects email/pw to sign IN user
	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(
			// response => console.log(response)
			response => {
				//once signed in.. go to the route page..
				this.router.navigate(['/']);
				//get token and save it
				firebase.auth().currentUser.getIdToken()
				.then(
					(token: string)=> this.token = token
				);
			}
		)
		.catch(
			error => console.log(error)
		);
	}

	//get the token to be able to fetch and save recipes for logged in users!
	getToken() {
		//return what firebase gives us (does not give back token synchronously, this is done asynchronously b/c firebase does not only retrieve token from lcal storage, but will check if token is VALID -- if invalid due to expiration, it will reach out to backend automatically to get a new one)
		//firebase.auth..getIdToken is a promise, so instead of returning it, will repeat the process and instead of waiting for it to finish, use the token set @ signin.  
		//DANGER of token expiration -- error handling and/or alt method must be used to avoid this.
		//this will be used on data-storage service.
		firebase.auth().currentUser.getIdToken()
		.then(
			(token: string)=> this.token = token
		);
        
        //return the token - may or may not be done before 'getToken' is finished, but it is already set on sign in.  Again, need to make sure token expiration is not a threat.
        return this.token;

        //now in data storage service, can call this method to access the token.
	}

	//determine if authenticated or not (for viewing or accessing certain features)
	isAuthenticated() {
		//is authenticated will return true if the token is set 
		//used in header component
		return this.token != null;
	}

	//destroy the token and clean up
	//called from header component
	logout() {
		//firebase cleans up the storage
		firebase.auth().signOut();
		//also clear the token in this service
		this.token = null;
		//redirect to login
		this.router.navigate(['/signin']);
	}
}