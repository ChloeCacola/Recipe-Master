//this is the model for the recipe object
export class RecipeModel {
	public name: string;
	public description: string;
	//this will be a url
	public imagePath: string; 

	constructor(name: string, desc: string, imagePath: string) {
		this.name = name;
		this.description = desc;
		this.imagePath = imagePath;
	}

}