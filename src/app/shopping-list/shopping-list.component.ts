import { Component, OnInit } from '@angular/core';

import { IngredientModel } from '../shared/ingredient.model';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
	
	ingredients: IngredientModel[] = [
	    //test ingredients
		new IngredientModel('Apples', 5),
		new IngredientModel('Tomatoes', 2)
	];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: IngredientModel) {
  	this.ingredients.push(ingredient);
  }
}
