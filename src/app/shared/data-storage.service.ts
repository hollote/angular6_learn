import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {

  }

  private recipesUrl = 'https://ng-recipe-book-ab708.firebaseio.com/recipes.json/';

  fetchRecipes() {

    // return this.httpClient.get(this.recipesUrl + '?auth=' + token)
    return this.httpClient.get<Recipe[]>(
      this.recipesUrl,
      {
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        map((recipes) => {
          recipes.map((recipe: Recipe) => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
              return recipe;
            }
          });
          return recipes;
        })
      )
      .subscribe((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
        return recipes;
      });
  }

  storeRecipes() {
    const header = new HttpHeaders().append('test', 'test2');

    const req = new HttpRequest('PUT', this.recipesUrl, this.recipeService.getRecipes(), {
      reportProgress: true,
    });

    return this.httpClient.request(req);

    // return this.httpClient.put(
    //   this.recipesUrl,
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     headers: header,
    //     params: new HttpParams().set('auth', token)
    //   }
    // );
  }
}
