import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES} from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {FeatureState} from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  private recipesUrl = 'https://ng-recipe-book-ab708.firebaseio.com/recipes.json/';

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap((action: FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(
        this.recipesUrl,
        {
          observe: 'body',
          responseType: 'json'
        });
    }),
    map((recipes) => {
      recipes.map((recipe: Recipe) => {
        if (!recipe.ingredients) {
          recipe.ingredients = [];
          return recipe;
        }
      });
      return {
        type: SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', this.recipesUrl, state.recipes, {
        reportProgress: true,
      });
      return this.httpClient.request(req);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<FeatureState>) {

  }
}
