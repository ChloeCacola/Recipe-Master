import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DropdownDirective } from './shared/dropdown.directive';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipe/recipe.service';
<<<<<<< HEAD
<<<<<<< HEAD
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
=======
>>>>>>> parent of d81dc93... initial data fetching and storing set up with firebase
=======
>>>>>>> parent of d81dc93... initial data fetching and storing set up with firebase

//for routing
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeNotSelectedComponent } from './recipe/recipe-not-selected/recipe-not-selected.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeNotSelectedComponent,
    RecipeEditComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
<<<<<<< HEAD
<<<<<<< HEAD
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard],
=======
  providers: [ShoppingListService, RecipeService],
>>>>>>> parent of d81dc93... initial data fetching and storing set up with firebase
=======
  providers: [ShoppingListService, RecipeService],
>>>>>>> parent of d81dc93... initial data fetching and storing set up with firebase
  bootstrap: [AppComponent]
})
export class AppModule { }
