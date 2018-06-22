import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  
  //define this as specifically a recipe model array so that it will recognize objects and only allow objects of specified model	
  recipes: RecipeModel[] = [
   //an example recipe
  new RecipeModel('Test Recipe', 'test desc', 'https://martensitakinenglish.files.wordpress.com/2014/03/printable-recipe-cards-martensitak.png'),
  new RecipeModel('Another Recipe', 'second desc', 'https://martensitakinenglish.files.wordpress.com/2014/03/printable-recipe-cards-martensitak.png')
  ];

  @Output() selected = new EventEmitter<RecipeModel>();

  defineSelected(currentRecipe : RecipeModel) {
  	this.selected.emit(currentRecipe);
  }

  constructor() { }

  ngOnInit() {
  }

}