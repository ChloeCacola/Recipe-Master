import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RecipeModel } from '../../recipe.model';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : RecipeModel;

  //[ below is practice only ]
  //  (to be modified later)
  //component is specified so don't need to pass the data YET
  //hence set at void on this level
  //on recipe-list, will pass a method with selected recipe from ngFor loop
  @Output() selectedRecipe = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelectRecipe() {
  	this.selectedRecipe.emit();
  }

}
