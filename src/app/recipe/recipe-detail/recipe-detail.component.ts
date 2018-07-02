import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { RecipeModel } from '../recipe.model';
import { IngredientModel } from '../../shared/ingredient.model';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  currentRecipe: RecipeModel;

  i: number;
  id: number;

  //inject shopping list service for use of informing list additions from the recipe
  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  	//subscribing to params observable in order to display current recipe
  	this.route.params
  		.subscribe(
  			(params: Params) => {
  				this.id = +params['id'];
  				this.currentRecipe = this.recipeService.getRecipe(this.id);
  			});

   }

  //inform shopping list service to add the selected recipe's ingredients to the list
  addToList() {
  	for(this.i=0; this.i<this.currentRecipe.ingredients.length; this.i++) {
  	  this.shoppingListService.addIngredient(this.currentRecipe.ingredients[this.i]);
  	}
  }

  	//Lesson 112: You could also inject shopping list service into recipe service, pass ingredientmodel array to recipe service, then reach out to shoppinglist service which could have an added method to push individual items of an array using spread operator (...) , see below:
  	/*
  		Optional alternative (in shopping-list service, a method that could be used for pushing ingredients from the recipe service):

  		addIngredients(ingredients: Ingredient[]) {

  			this.ingredients.push(...inredients);
  			this.ingredientsChanged.emit(this.ingredients.slice());
  		}
  	*/ 
}
