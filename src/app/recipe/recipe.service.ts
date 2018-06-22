import { RecipeModel } from './recipe.model';

export class RecipeService {

  //the recipe data (not accessible from outside)
  private recipes: RecipeModel[] = [
  //example recipes
  new RecipeModel('Test Recipe', 'test desc', 'https://martensitakinenglish.files.wordpress.com/2014/03/printable-recipe-cards-martensitak.png'),
  new RecipeModel('Another Recipe', 'second desc', 'https://martensitakinenglish.files.wordpress.com/2014/03/printable-recipe-cards-martensitak.png')
  ];

  //allowing access from outside
  getRecipes() {
  	//because arrays and objects are reference types, returning this.recipes only will access the same array on this service.
  	//Instead of this.recipes, .slice is added so that a copy of the array is returned instead. 
  	return this.recipes.slice();  //(a copy!)
  }

}