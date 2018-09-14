import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/auth/authentication-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authenticated: boolean;

  constructor(private router: Router, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.auth.isAuthenticated().subscribe(authenticated => {
      this.authenticated = authenticated;
      if (!authenticated) {
        this.router.navigate(['auth', 'login']);
      }
    });
    if (this.authenticated) {
      this.router.navigate(['dashboard']);
    }
  }

}
