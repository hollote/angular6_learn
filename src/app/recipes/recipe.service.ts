import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelecter = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'a test recipe',
      'test description',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Vatap%C3%A1.jpg/1280px-Vatap%C3%A1.jpg',
      [
        new Ingredient('shrimp', 3),
        new Ingredient('pepper', 1),
        new Ingredient('corn', 2)
      ]
    ),
    new Recipe(
      'a test recipe 2',
      'test description 2',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Handi-chicken-recipe.jpg/800px-Handi-chicken-recipe.jpg',
      [
        new Ingredient('onion', 1),
        new Ingredient('chicked', 2),
        new Ingredient('lemon', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
