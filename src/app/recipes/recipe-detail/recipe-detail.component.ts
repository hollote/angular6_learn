import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {AppState} from '../../shopping-list/store/shopping-list.reducers';

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
              private authService: AuthService,
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
    if (!this.authService.isAuthenticated()) {
      return false;
    }
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
