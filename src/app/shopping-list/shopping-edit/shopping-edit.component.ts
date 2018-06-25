import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IngredientModel } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd() {
  	//use const when only declaring a variable ONE time
  	//declare something a const if don't plan on changing it

  	//get the viewchild input values
  	const ingName = this.nameInputRef.nativeElement.value;
  	const ingAmt = this.amountInputRef.nativeElement.value;

  	//create new ingredient with input values
  	const newIngredient = new IngredientModel(ingName, ingAmt);

  	//pass the new ingredient to the service
  	this.shoppingListService.addIngredient(newIngredient);
  }

}
