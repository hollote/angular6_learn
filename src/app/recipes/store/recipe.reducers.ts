import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';
import {AppState} from '../../store/app.reducer';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payload]
      };
    }
    case ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case UPDATE_RECIPE: {
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    }
    case DELETE_RECIPE: {
      const newRecipes = [...state.recipes];
      newRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: newRecipes
      };
    }
    default:
      return state;
  }
}
