import { Component, OnInit } from '@angular/core';

import { RecipeModel } from '../recipe.model';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  
  //define this as specifically a recipe model array so that it will recognize objects and only allow objects of specified model	
  //moved to recipe.service (delete)
  recipes: RecipeModel[];

  //inject recipe service
  constructor(private recipeService: RecipeService) { }

  //define recipes with recipe service
  ngOnInit() {
    //subscribing to any recipe updates
    this.recipeService.recipesChanged.subscribe(
      (recipesUpdated: RecipeModel[])=> {
        this.recipes = recipesUpdated;
      });

    //getting the recipes from recipe service (where recipes are stored and handled)
  	this.recipes = this.recipeService.getRecipes();
  }

}