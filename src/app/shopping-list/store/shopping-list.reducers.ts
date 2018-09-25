import {Ingredient} from '../../shared/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      };
    case UPDATE_INGREDIENT:
      const newIngredients = state.ingredients.slice();
      newIngredients[state.editedIngredientIndex] = action.payload.ingredient;

      return {
        ...state,
        ingredients: newIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case DELETE_INGREDIENT:
      let ingredients = state.ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: state.ingredients.length === 0 ? [] : ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
