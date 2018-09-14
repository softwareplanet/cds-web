import {Component} from '@angular/core';
import {AuthenticationService} from './services/auth/authentication-service.service';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CDS';
  public authenticated: boolean;


  constructor(public authService: AuthenticationService,
              public router: Router,
              private notifications: SnotifyService) {
    this.notifications.setDefaults({
      toast:{
        showProgressBar: false
      }
    });
    this.authService.isAuthenticated().subscribe(authenticated => {
      this.authenticated = authenticated;
      if (!authenticated) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
