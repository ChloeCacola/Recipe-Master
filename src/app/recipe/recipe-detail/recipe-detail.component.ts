import { Component, OnInit, Input } from '@angular/core';

import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() currentRecipe : RecipeModel;

  constructor() { }

  ngOnInit() {  }

}
