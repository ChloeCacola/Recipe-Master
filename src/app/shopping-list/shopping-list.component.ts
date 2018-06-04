import { Component, OnInit } from '@angular/core';

import { IngredientModel } from '../shared/ingredient.model';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
	ingredients: IngredientModel[] = [
	    //test ingredients
		new IngredientModel('Apples', 5),
		new IngredientModel('Tomatoes', 2)
	];

  constructor() { }

  ngOnInit() {
  }

}
