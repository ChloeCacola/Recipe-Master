import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//child-pages
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeNotSelectedComponent } from './recipe/recipe-not-selected/recipe-not-selected.component';

const appRoutes: Routes = [
	//pathMatch must be used to redirect empty path; it specifies to only redirect if the full path is empty; the default is 'prefix'
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{path: 'recipes', component: RecipeComponent,
			children: [
			  //here, this empty path references a path with just /recipes.  In this case, if there are no recipes displayed via :id, 
			  {path: '', component: RecipeNotSelectedComponent},
			  {path: ':id', component: RecipeDetailComponent }
			]
	},
	{path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}