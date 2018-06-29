import { IngredientModel } from '../shared/ingredient.model';

//this is the model for the recipe object
export class RecipeModel {
	public name: string;
	public description: string;
	//this will be a url
	public imagePath: string;
	public ingredients: IngredientModel[]; 

	constructor(name: string, desc: string, imagePath: string, ingredients: IngredientModel[]) {
		this.name = name;
		this.description = desc;
		this.imagePath = imagePath;
		this.ingredients = ingredients;
	}

}