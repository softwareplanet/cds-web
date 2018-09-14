import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {WorkerService} from '../services/worker.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/auth/authentication-service.service';
import {SnotifyService} from 'ng-snotify';


@Component({
  selector: 'app-company-creating',
  templateUrl: './company-creating.component.html',
  styleUrls: ['./company-creating.component.scss']
})
export class CompanyCreatingComponent implements OnInit {

  public user: User;
  public company: { name: string, website: string, defaultStatus: {title: string} };
  public userFilled: boolean;
  public notCompleted: boolean;
  public password: string;

  constructor(private userService: WorkerService, private router: Router, private notificationService: SnotifyService) {
  }

  ngOnInit() {
    this.userFilled = false;
    this.user = new User();
    this.company = {name: '', website: '', defaultStatus: {title: ''}};
    this.notCompleted = false;
  }

  complete() {
    if (this.userFilled) {
      if (this.company.website && this.company.name && this.company.defaultStatus.title) {
        this.userService.createUserAndCompany(this.user, this.company, this.password);
      } else {
        this.notCompleted = true;
      }
    }
  }

  cancel() {
    if (this.userFilled) {
      this.userFilled = false;
    } else {
      this.router.navigate(['auth', 'login']);
    }
  }

  setPass(pass) {
    this.password = pass;
    this.userFilled = true;
  }
}
