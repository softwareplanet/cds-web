import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/auth/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password: string;
  public username: string;
  public passValid = true;
  public userValid = true;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.password = '';
    this.username = '';
  }

  login() {
    if (this.validate()) {
      this.authService.authorise(this.username, this.password);
    }
  }

  validate(): boolean {
    this.userValid = this.username.length > 4;
    this.passValid = this.password.length > 4;
    return this.passValid && this.userValid;
  }
}
