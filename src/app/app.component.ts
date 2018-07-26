import { Component, OnInit } from '@angular/core';
import { InitializeFb } from './initialize-fb.service';

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

  constructor(private initFb: InitializeFb) {}

  ngOnInit() {
  	//with firebase alias, execute firebase to initialize - expects a js object as arg and can be retrieved from backend 
  	//(go to firebase authentication, web setup and retrieve AUTH DOMAIN and API KEY)
  	//SDK will get initialized at the start of the app
    //the key and domain are protected here
  	firebase.initializeApp({
  	    apiKey: this.initFb.getApiKey(),
   	    authDomain: this.initFb.getAuthDomain()
  	});
  }

  onNavigate(feature: string) {
  	this.selected = feature;
  }

}
