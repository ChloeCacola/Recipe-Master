import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../recipe.model';

@Component({
 selector: 'recipe-not-selected',
 templateUrl: './recipe-not-selected.component.html',
 styleUrls: ['./recipe-not-selected.component.css']
})
export class RecipeNotSelectedComponent implements OnInit {

	noRecipes: boolean;

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {

		if(this.recipeService.getRecipes().length === 0) {
			this.noRecipes = true;
		}
		else {
			this.noRecipes = false;
		}

		this.recipeService.recipesChanged.subscribe(
			(recipes: RecipeModel[])=> {
				if (recipes.length === 0) {
					this.noRecipes = true;
				}
				else {
					this.noRecipes = false;
				}
			}
		);
	}

}