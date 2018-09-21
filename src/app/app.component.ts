import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private config = {
    apiKey: 'AIzaSyCm2KC3IWYEs8nktw3nP8BLgfVYH5faQVY',
    authDomain: 'ng-recipe-book-ab708.firebaseapp.com'
  };

  ngOnInit() {
    firebase.initializeApp(this.config);
  }
}
