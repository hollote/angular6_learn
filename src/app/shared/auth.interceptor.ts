import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {switchMap, take} from 'rxjs/operators';
import {State} from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted', req);

    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: State) => {
        const copiedReq = req.clone({
          headers: req.headers.append('clone1', 'new'),
          params: req.params.set('auth', authState.token)
        });
        return next.handle(copiedReq);
      })
    );
  }
}
