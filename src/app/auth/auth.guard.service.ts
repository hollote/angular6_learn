import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {map, take} from 'rxjs/operators';
import {State} from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: State) => {
        return authState.authenticated;
      })
    );
  }
}
