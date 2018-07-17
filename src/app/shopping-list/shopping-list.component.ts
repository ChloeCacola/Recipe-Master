import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IngredientModel } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';



@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngredientModel[];
  //when working with Observable, 'Subject' instead of Angular's eventemitter, will need to unsubscribe from the subscription, and define it here for access
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  	this.ingredients = this.shoppingListService.getIngredients();

  	//inform this component that the list has changed/updated
  	//to be updated later with observables
  	this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
  		(ingredients: IngredientModel[]) => {
  			this.ingredients = ingredients;
  		    }
  		)
  }

  onEditItem(index: number) {
  	this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
  	//important to prevent memory leaks; using our own subject so much unsubscribe
  	this.subscription.unsubscribe();
  }

}
