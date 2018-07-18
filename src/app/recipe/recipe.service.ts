import { Subject } from 'rxjs';

import { RecipeModel } from './recipe.model';
import { IngredientModel } from '../shared/ingredient.model';

export class RecipeService {

  //using an observable so can subscribe to the updates whenever a recipe is modified or a new one is created
  recipesChanged = new Subject<RecipeModel[]>();
  //and for ingredients
  ingredientsChanged = new Subject<IngredientModel[]>();

  //the recipe data (not accessible from outside)
  private recipes: RecipeModel[] = [
  //example recipes
  new RecipeModel(
  	'Test Recipe', 
  	'test desc', 
  	'https://martensitakinenglish.files.wordpress.com/2014/03/printable-recipe-cards-martensitak.png',
  	[
  	  new IngredientModel('test ingredient', 5),
  	  new IngredientModel('test ingr 2', 10),
  	  new IngredientModel('test ingr 3', 1)
  	]),
  new RecipeModel(
  	'Another Recipe', 
  	'second desc', 
  	'https://martensitakinenglish.files.wordpress.com/2014/03/printable-recipe-cards-martensitak.png',
  	[
  	  new IngredientModel('test ingr 1', 3),
  	  new IngredientModel('test ingr 2', 3),
  	  new IngredientModel('test ingr 3', 8)
  	])
  ];

  //allowing access from outside
  getRecipes() {
  	//because arrays and objects are reference types, returning this.recipes only will access the same array on this service.
  	//Instead of this.recipes, .slice is added so that a copy of the array is returned instead. 
  	return this.recipes.slice();  //(a copy!)
  }

  getRecipe(index: number) {
  	return this.recipes[index]
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    //emitting the recipe list update --> subscribed to in recipe-list component
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteIngredient(index: number, ingredientIndex: number) {
    this.recipes[index].ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.recipes[index].ingredients);
  }
}