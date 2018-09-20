import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {

  }

  private recipesUrl = 'https://ng-recipe-book-ab708.firebaseio.com/recipes.json/';

  fetchRecipes() {
    return this.http.get(this.recipesUrl)
      .pipe(
        map((response: Response) => {
          const recipes = response.json();
          recipes.map((recipe: Recipe) => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
              return recipe;
            }
          });
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
        return recipes;
      });
  }

  storeRecipes() {
    return this.http.put(
      this.recipesUrl,
      this.recipeService.getRecipes()
    );
  }
}
