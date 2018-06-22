import { Component, OnInit } from '@angular/core';

import { RecipeModel } from './recipe.model';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipeService]
})
export class RecipeComponent implements OnInit {
  
  //this is defined with $event (output data) on recipe template
  currentRecipeEl;

  constructor() { }

  ngOnInit() {
  }

}
