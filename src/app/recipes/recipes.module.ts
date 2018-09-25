import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {RecipesComponent} from './recipes.component';
import {SelectRecipeComponent} from './select-recipe/select-recipe.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {CommonModule} from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducer} from './store/recipe.reducers';
import {EffectsModule} from '@ngrx/effects';
import {RecipeEffects} from './store/recipe.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    SelectRecipeComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule {

}
