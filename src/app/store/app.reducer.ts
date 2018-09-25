import * as auth from '../auth/store/auth.reducers';
import {authReducer} from '../auth/store/auth.reducers';
import * as shoppingList from '../shopping-list/store/shopping-list.reducers';
import {shoppingListReducer} from '../shopping-list/store/shopping-list.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: shoppingList.State;
  auth: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};

