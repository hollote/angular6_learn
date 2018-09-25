import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {shoppingListReducer} from './shopping-list/store/shopping-list.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
