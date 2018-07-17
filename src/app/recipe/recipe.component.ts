import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipeService]
})
export class RecipeComponent implements OnInit {
  

  //inject recipe service
  //Important note:  This must be the same instance as other recipe services referenced in recipe components
  //Because of heirarchal structure of services, recipe service is provided on this recipe component level and may be moved to app.component or app.module if wider access is needed
  constructor() { }

  ngOnInit() {
  	
  }

}
