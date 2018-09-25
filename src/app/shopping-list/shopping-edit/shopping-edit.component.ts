import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient} from '../store/shopping-list.actions';
import {AppState} from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingList') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.onClear();
    this.store.dispatch(new DeleteIngredient());
  }

}
