import { Component, OnInit } from '@angular/core';

import { RecipeModel } from './recipe.model';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  
  //this is defined with $event (output data) on recipe template
  currentRecipeEl;

  constructor() { }

  ngOnInit() {
  }

}
