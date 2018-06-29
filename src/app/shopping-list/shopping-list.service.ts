import { EventEmitter } from '@angular/core';

import { IngredientModel } from '../shared/ingredient.model';

export class ShoppingListService {

  //it is not good practice to use eventemitters in services.
  // this is for learning; it will be changed later with observables!
  // NOTE: could use ngDoCheck as a way of updating the ingredients copy on shopping-list component, BUT, based on input/docs the proper method would be to subscribe to the event here.
  //could also pass VOID here and simply call getIngredients() again in component instead of passing the array again, this is again for learning/clarity.
  ingredientsChanged = new EventEmitter<IngredientModel[]>(); //could simply be void and call getIngredients again from shopping-list component.


  //the recipe data 
  private ingredients: IngredientModel[] = [
  		//test ingredients
		new IngredientModel('Apples', 5),
		new IngredientModel('Tomatoes', 2)
		];

  addIngredient(ingredients: IngredientModel) {
  	//add a new ingredient
  	this.ingredients.push(ingredients);
  	this.ingredientsChanged.emit(this.ingredients.slice());
  }

  getIngredients() {
  	return this.ingredients.slice();
  }

}