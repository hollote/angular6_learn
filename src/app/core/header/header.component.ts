import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
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
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
