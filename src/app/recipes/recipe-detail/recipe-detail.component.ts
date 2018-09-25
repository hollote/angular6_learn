import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {Observable} from 'rxjs';
import {FeatureState, State} from '../store/recipe.reducers';
import {take} from 'rxjs/operators';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<FeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
      // TO FIX: If id is not exits, error, need to redirect to main /recipes page
      // if (!recipe) {
      //   this.router.navigate(['/recipes']);
      //   return false;
      // }
      // this.recipe = recipe;
    });
  }

  onDeleteRecipe() {
    // TO FIX
    // this.store.select('auth').pipe(
    //   map((authState: State) => {
    //     return authState.authenticated;
    //   }),
    //   tap((authenticated: boolean) => {
    //     if (authenticated) {
    //       return false;
    //     }
    //     this.recipeService.deleteRecipe(this.id);
    //     this.router.navigate(['/recipes']);
    //   })
    // );
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList() {
    this.store.select('recipes').pipe(
      take(1)
    ).subscribe((recipeState: State) => {
      this.store.dispatch(new AddIngredients(recipeState.recipes[this.id].ingredients));
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); // just for testing
  }

}
