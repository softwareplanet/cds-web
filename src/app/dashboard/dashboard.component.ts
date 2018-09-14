import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private $location: Location,
              private router: Router) {
  }

  ngOnInit() {
    console.log('in dashboard');
    const path = this.$location.path(false);
    if (path === '/dashboard' || path === '/dashboard/') {
      this.router.navigate(['dashboard', 'create-job']);
    }

  }
}
