import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, 
		 FormControl, 	
		 FormArray, 
		 Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../recipe.model';
import { IngredientModel } from '../../shared/ingredient.model';


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

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

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
  						'name': new FormControl(ingredient.name, Validators.required),
  						//same pattern validator as used in template form in 'shopping-edit' - no quotes, use between two forward slashes -> /here/
  						'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
  					})
  				);
  			}
  		}
  	}

  	this.recipeForm = new FormGroup({
  		'recipeName': new FormControl(recipeName, Validators.required),
  		'imgPath': new FormControl(recipeImgPath, Validators.required),
  		'description': new FormControl(recipeDesc, Validators.required),
  		'ingredients': recipeIngredients
  	});
  }

  onAddIngredient() {
  	//add a new control to the array of form controls for ingredients
  	//**MUST convert to FormArray
  	(<FormArray>this.recipeForm.get('ingredients')).push(
  		new FormGroup({
  			'name': new FormControl(null, Validators.required),
  			'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
  		})
  	);
  }

  onSave() {
  	//newRecipe below is the same as this.recipeForm.value...
  	const newRecipe = new RecipeModel(
  			this.recipeForm.value['recipeName'],  
  			this.recipeForm.value['description'],
  			this.recipeForm.value['imgPath'],
  			this.recipeForm.value['ingredients']);

  	if(this.editMode) {
  		this.recipeService.updateRecipe(this.id, newRecipe);
  	} else {
  		this.recipeService.addRecipe(newRecipe);
  	}

  	//redirect AFTER form submission
  	if(!this.recipeForm.pending) {
  		this.router.navigate(['../'], {relativeTo: this.route});
  	}

  }

  onDelete() {
  	this.recipeService.deleteRecipe(this.id);
  	this.router.navigate(['/recipes']);
  }

  onCancel() {
  	//if cancelling from edit, will take back to recipe,
  	//if cancelling from new will take back to all recipes 
  	this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
  	(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
