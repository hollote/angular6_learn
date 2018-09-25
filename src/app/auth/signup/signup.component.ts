import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {TrySignup} from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignup({username: email, password}));
  }

}
