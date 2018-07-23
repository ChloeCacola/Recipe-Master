import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { RecipeService } from '../recipe/recipe.service';
import { RecipeModel } from '../recipe/recipe.model';


//needed to inject http service that ships with angular & the recipe service of this app
@Injectable()
export class DataStorageService {

	//inject http service & recipe service
	constructor(private http: Http, private recipeService: RecipeService) {}

	//used to save recipe data
	saveRecipes() {
     //create or overwrite data with put (using firebase here to store the data) --> /recipes.json 
     //saving or storing a copy of the recipes in the database
     return this.http.put('https://ng-recipe-master-book.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  //with subscribing auto
  fetchRecipes() {
    this.http.get('https://ng-recipe-master-book.firebaseio.com/recipes.json')
    .subscribe(
    	(response: Response)=> {
    		//transform to js object
    		const recipes: RecipeModel[] = response.json();
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