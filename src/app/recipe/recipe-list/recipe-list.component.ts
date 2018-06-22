import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RecipeModel } from '../recipe.model';

import { RecipeService } from '../recipe.service');

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  
  //define this as specifically a recipe model array so that it will recognize objects and only allow objects of specified model	
  //moved to recipe.service (delete)
  recipes: RecipeModel[];

  @Output() selected = new EventEmitter<RecipeModel>();

  defineSelected(currentRecipe : RecipeModel) {
  	this.selected.emit(currentRecipe);
  }

  //inject recipe service
  constructor(private recipeService: RecipeService) { }

  //define recipes with recipe service
  ngOnInit() {
  	this.recipes = this.recipeService.getRecipes();
  }

}