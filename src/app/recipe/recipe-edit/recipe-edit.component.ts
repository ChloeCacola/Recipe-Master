import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  
  id: number;
  //creating a new recipe if NOT in edit mode
  //edit mode determines if fields are prepopulated or not
  editMode = false;
  //for new and existing recipes (reactive form)
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params: Params) => {
  				this.id = +params['id'];
  				//checking if the id is defined or not to determine edit mode (there will be a defined id if editing)
  				this.editMode = params['id'] != null;
  				this.initForm();
  			}
  		);
  }

  //for initializing the reactive recipe form
  //call this when the route params change (page reloaded) - in subscription route.params
  private initForm() {
  	//for defaults
  	let recipeName = '';
  	let recipeImgPath = '';
  	let recipeDesc = '';
  	let recipeIngredients = new FormArray([]);
  	//must determine edit mode
  	if (this.editMode) {
  		//fetch recipe
  		const recipe = this.recipeService.getRecipe(this.id);
  		//set default values
  		recipeName = recipe.name;
  		recipeImgPath = recipe.imagePath;
  		recipeDesc = recipe.description;
  		//check if recipe has ingredients to prepopulate
  		if (recipe['ingredients']) {
  			for (let ingredient of recipe.ingredients) {
  				recipeIngredients.push(
  					new FormGroup({
  						'name': new FormControl(ingredient.name),
  						'amount': new FormControl(ingredient.amount)
  					})
  				);
  			}
  		}
  	}

  	this.recipeForm = new FormGroup({
  		'recipeName': new FormControl(recipeName),
  		'imgPath': new FormControl(recipeImgPath),
  		'description': new FormControl(recipeDesc),
  		'ingredients': recipeIngredients
  	});
  }

  onAddIngredient() {
  	//add a new control to the array of form controls for ingredients
  }

  onSave() {
  	console.log(this.recipeForm);
  }

}
