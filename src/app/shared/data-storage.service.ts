import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {

  }

  private recipesUrl = 'https://ng-recipe-book-ab708.firebaseio.com/recipes.json/';

  fetchRecipes() {
    const token = this.authService.getToken();

    console.log(token);

    return this.http.get(this.recipesUrl + '?auth=' + token)
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
    const token = this.authService.getToken();

    return this.http.put(
      this.recipesUrl + '?auth=' + token,
      this.recipeService.getRecipes()
    );
  }
}
