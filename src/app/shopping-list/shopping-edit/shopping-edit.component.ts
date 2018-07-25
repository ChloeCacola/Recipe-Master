import { Component, 
		 OnInit, 
		 OnDestroy, 
		 ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IngredientModel } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';
import { AuthService } from '../../auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  //reach out to viewchild to get access to the shopping list form
  @ViewChild('f') listForm: NgForm;
  //for unsubscribing to the ingredient clicked to edit
  subscription: Subscription;
  //specify if editing and the item id being edited
  //editMode is used on the form for changing buttons & specifies action - whether to update or add
  editMode = false;
  editedItemIndex: number;
  editedItem: IngredientModel;


  constructor(private shoppingListService: ShoppingListService, private authService: AuthService) { }

  ngOnInit() {

  	//Subscription allows to set value of the existing form to edit within the same form. (fills in inputs with list item clicked)
  	//subscribe to the startedEditing subject to get the id of the ingredient being edited
  	this.subscription = this.shoppingListService.startedEditing.subscribe(
  		(index: number)=> {
  			this.editedItemIndex = index;
  			this.editMode = true;
  			this.editedItem = this.shoppingListService.getIngredient(index);
  			this.listForm.setValue({
  				itemName: this.editedItem.name,
  				amount: this.editedItem.amount
  			})
  			}
  		);
  }

  onSubmitItem(form: NgForm) {

  		//get value of form passed from template
  		const value = form.value;

	  	//create new ingredient with input values
	  	const newIngredient = new IngredientModel(value.itemName, value.amount);

	  	//IF in edit mode, do not add new ingredient - reach out to shopping list service to update the ingredient
	  	if(this.editMode) {
	  		this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
	  	} else {
	  	//otherwise, pass the new ingredient to the service
	  	this.shoppingListService.addIngredient(newIngredient);
	  	}
	  	//must set edit mode to false to prevent getting 'stuck' on 'update' button
	  	this.editMode = false;
	  	//once added or updated, reset/clear form
	  	form.reset();
	  }

  onClear() {
  		this.editMode = false;
	  	this.listForm.reset();
	  }

  onDelete() {
  		const selectedIndex = this.editedItemIndex;
  		this.shoppingListService.deleteIngredient(selectedIndex);
  		
  		this.onClear();
  }

  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }

}
