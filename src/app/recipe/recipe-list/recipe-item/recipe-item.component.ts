import { Component, OnInit, Input } from '@angular/core';

import { RecipeModel } from '../../recipe.model';

import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : RecipeModel;
  recipeList: RecipeModel[];

  //inject recipe service 
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  	//subscribing to any recipe updates
  	//this is needed here or else the params will not be updated when deleting recipes (id for params updated here in html)
    this.recipeService.recipesChanged.subscribe(
      (recipesUpdated: RecipeModel[])=> {
        this.recipeList = recipesUpdated;
      });

    //getting the recipes from recipe service (where recipes are stored and handled)
  	this.recipeList = this.recipeService.getRecipes();
  }

}
