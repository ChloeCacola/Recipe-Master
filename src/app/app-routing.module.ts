import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
	//pathMatch must be used to redirect empty path; it specifies to only redirect if the full path is empty; the default is 'prefix'
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{path: 'recipes', component: RecipeComponent},
	{path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}