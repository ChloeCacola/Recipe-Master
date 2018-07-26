import { Component } from '@angular/core';
<<<<<<< HEAD
import { Response } from '@angular/http';

import { RecipeService } from '../recipe/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
=======
>>>>>>> parent of d81dc93... initial data fetching and storing set up with firebase

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
<<<<<<< HEAD
export class HeaderComponent {

	constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService, private authService: AuthService) {}

	onSaveData() {
		this.dataStorageService.saveRecipes().subscribe(
			(response)=> console.log(response),
			(error)=> console.log(error)
		);
	}

	//using 'auto'subscribe whenever .fetchRecipes - the get method - is called
	onFetchData() {
		this.dataStorageService.fetchRecipes();
	}

	//instead of subscribing here, can subscribe in data-storage service at the time of calling get method - fetchRecipes() (see above for using that process instead)
	// onFetchData() {
	// 	this.dataStorageService.fetchRecipes().subscribe(
	// 		(recipes: any[])=> {
	// 			for(const recipe of recipes) {
	// 				this.recipeService.updateRecipe(recipes.indexOf(recipe), recipe);
	// 			}
	// 		},
	// 		(error)=> console.log(error)
	//    )
	// }

	onLogout() {
		this.authService.logout();
	}

}
=======
export class HeaderComponent {}
>>>>>>> parent of d81dc93... initial data fetching and storing set up with firebase
