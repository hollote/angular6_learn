import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
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
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); // just for testing
  }

}
