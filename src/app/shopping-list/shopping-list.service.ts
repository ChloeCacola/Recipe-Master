import { IngredientModel } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

export class ShoppingListService {

  //using an observable instead of eventemitter 
  ingredientsChanged = new Subject<IngredientModel[]>(); //could simply be void and call getIngredients again from shopping-list component.
  startedEditing = new Subject<number>();

  //the recipe data 
  private ingredients: IngredientModel[] = [
  		//test ingredients
		new IngredientModel('Apples', 5),
		new IngredientModel('Tomatoes', 2)
		];

  addIngredient(ingredients: IngredientModel) {
  	//add a new ingredient
  	this.ingredients.push(ingredients);
  	this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
  	return this.ingredients.slice();
  }

  //for editing
  getIngredient(index: number) {
  	return this.ingredients[index];
  }
  //will call this item if in 'editMode' in shopping-edit
  updateIngredient(index: number, newIngredient: IngredientModel) {
  	this.ingredients[index] = newIngredient;
  	//emit updated ingredients (copy)
  	this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
  	this.ingredients.splice(index, 1);
  	this.ingredientsChanged.next(this.ingredients.slice());
  }

}