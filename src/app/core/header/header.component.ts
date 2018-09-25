import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Observable} from 'rxjs';
import {State} from '../../auth/store/auth.reducers';
import {Logout} from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<State>;

  constructor(private dataStorageService: DataStorageService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogOut() {
    this.store.dispatch(new Logout());
  }

}
