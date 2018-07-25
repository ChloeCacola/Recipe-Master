//import all and use firebase alias
import * as firebase from 'firebase';

import { Subject } from 'rxjs';

export class AuthService {

	//this token is needed to confirm user is logged in and able to save and fetch recipes.
	//this will be set on signin in the response and then used in getToken()..
	//NOTE: research better ways to handle this in the event of expired tokens.
	token: string;

	message = new Subject<string>();
	error = new Subject<boolean>();

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
			//grab the token and save it
			response => {
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
}