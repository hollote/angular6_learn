import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {LOGOUT, SET_TOKEN, SIGNIN, SIGNUP, TRY_SIGNIN, TRY_SIGNUP, TrySignin, TrySignup} from './auth.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {from} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    tap(() => this.router.navigate(['/'])),
    mergeMap((token: string) => {
      return [
        {
          type: SIGNUP
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: { username: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    tap(() => this.router.navigate(['/'])),
    mergeMap((token: string) => {
      return [
        {
          type: SIGNIN
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );


  constructor(private actions$: Actions, private router: Router) {

  }
}
