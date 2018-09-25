import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {TrySignin} from '../store/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {

  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignin({username: email, password}));
  }

}
