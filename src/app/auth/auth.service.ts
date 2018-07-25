//import all and use firebase alias
import * as firebase from 'firebase';

import { Subject } from 'rxjs';

export class AuthService {

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
			response => console.log(response)
		)
		.catch(
			error => console.log(error)
		);
	}
}