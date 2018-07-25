import { Component, OnInit } from '@angular/core';

//import firebase as firebase alias
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  selected = 'recipe';

  ngOnInit() {
  	//with firebase alias, execute firebase to initialize - expects a js object as arg and can be retrieved from backend 
  	//(go to firebase authentication, web setup and retrieve AUTH DOMAIN and API KEY)
  	//SDK will get initialized at the start of the app
  	firebase.initializeApp({
  	    apiKey: "AIzaSyDAvZSxPcjYAUJz5dLIW3iK2gmTJBIL6qE",
   	    authDomain: "ng-recipe-master-book.firebaseapp.com"
  	});
  }

  onNavigate(feature: string) {
  	this.selected = feature;
  }

}
