import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { RecipeService } from '../recipe/recipe.service';
import { AuthService } from '../auth/auth.service';
import { RecipeModel } from '../recipe/recipe.model';


//needed to inject http service that ships with angular & the recipe service of this app
@Injectable()
export class DataStorageService {

	//inject http service & recipe service, & auth service for token check
	constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

	//used to save recipe data
	saveRecipes() {
    //the token used to allow access for signed in users
     const token = this.authService.getToken();
     //create or overwrite data with put (using firebase here to store the data) --> /recipes.json 
     //saving or storing a copy of the recipes in the database
     //add authentication by ?auth= plus token, as explained in fetchRecipes method below.
     return this.http.put('https://ng-recipe-master-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  //with subscribing auto
  fetchRecipes() {

    //first confirm the token for logged in users
    const token = this.authService.getToken();
    //(above) firebase's getIdToken is a promise, so could theoretically use a then block after getToken if only the getIdToken method was being returned.  However, the issue with that is that the token which will be available in that response method will not be accessible outside of it, so it can be used in the get function.  And the get function cannot be used inside of it, because if the observable wanted to be returned, it wouldn't be available b/c would be in a callback.  So, SEE AUTH service 'token' resolution.

    //in order to authenticate to backend, need to add a query parameter, auth (recognized by firebase), to the route and set it equal to the token retrieved  
    //this sends the token as apart of the url so that firebase can identify the user
    this.http.get('https://ng-recipe-master-book.firebaseio.com/recipes.json?auth=' + token)
    //before subscribing, extract data and make sure there is an ingredients property 
    .pipe(map(
    	(response: Response)=> {
    		//transform to js object
    		const recipes: RecipeModel[] = response.json();
    		for (let recipe of recipes) {
    			//if there is no ingredients property, add it
    			if(!recipe['ingredients']) {
    				console.log(recipe);
    				//set to an empty array
    				recipe['ingredients']=[];
    			}
    		}
    		return recipes;
    	}))
    .subscribe(
    	(recipes: RecipeModel[])=> {
    		//replace existing recipes (new method implemented in recipe service)
    		this.recipeService.setRecipes(recipes);
    	});
  }  
  //without subscribing
  //   fetchRecipes() {
  //   return this.http.get('https://ng-recipe-master-book.firebaseio.com/recipes.json')
  //   .pipe(map(
  //     (response: Response) => {
  //       return response.json();
  //     }))
  //   .pipe(catchError((error: Response)=> {
  //     return throwError('Something went wrong :(');
  //     }
  //    )
  //   );
  // }
}