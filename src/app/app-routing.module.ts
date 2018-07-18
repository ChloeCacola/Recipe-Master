import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//child-pages
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeNotSelectedComponent } from './recipe/recipe-not-selected/recipe-not-selected.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
	//pathMatch must be used to redirect empty path; it specifies to only redirect if the full path is empty; the default is 'prefix'
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{path: 'recipes', component: RecipeComponent,
			children: [
			  //here, this empty path references a path with just /recipes.  In this case, if there are no recipes displayed via :id, 
			  {path: '', component: RecipeNotSelectedComponent},
			  //IMPORTANT!  any dynamic route (in this case, :id) must come AFTER any other relative child routes (otherwise, 'new' will try to be interpreted as an :id) 
			  {path: 'new', component: RecipeEditComponent},
			  //for if id is not yet defined for new recipes
			  //(may be alternative way of doing this, but this was fast!)
			  {path: 'NaN', redirectTo: '/recipes'},
			  {path: ':id', component: RecipeDetailComponent },
			  {path: ':id/edit', component: RecipeEditComponent}
			]
	},
	{path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}