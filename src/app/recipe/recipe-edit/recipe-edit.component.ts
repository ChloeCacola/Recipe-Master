import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  
  id: number;
  //creating a new recipe if NOT in edit mode
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params: Params) => {
  				this.id = +params['id'];
  				//checking if the id is defined or not to determine edit mode (there will be a defined id if editing)
  				this.editMode = params['id'] != null;
  			})
  }

}
