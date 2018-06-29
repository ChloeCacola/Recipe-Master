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

  recipeList = this.recipeService.getRecipes();

  //inject recipe service 
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

}
