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

  //inject recipe service 
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  //when recipe is selected, utilize recipe service to emit the selected recipe
  onSelectRecipe() {
  	this.recipeService.recipeSelected.emit(this.recipe);
  }

}
