import { Component, OnInit } from '@angular/core';
import {Status} from '../../models/status';
import {StatusService} from '../../services/status.service';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-company-editing',
  templateUrl: './company-editing.component.html',
  styleUrls: ['./company-editing.component.scss']
})
export class CompanyEditingComponent implements OnInit {
  public company: {name: string, website: string, defaultStatus: Status};
  public companyCache: {name: string, website: string, defaultStatus: Status};
  public notCompleted = false;
  public statuses: Status[] = [];
  public statusId = 0;

  constructor(private statusService: StatusService,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.company = {name: '', website: '', defaultStatus: new Status()};
    this.statusService.getStatuses()
      .subscribe(statuses => {
        this.statuses = statuses;
      });
    this.companyService.getCompany()
      .subscribe(company => {
        this.companyCache = Object.assign({}, company);
        this.company = Object.assign({}, company);
        this.statusId = this.company.defaultStatus.id;
      });
  }

  complete() {
    if (this.company.website && this.company.name && this.company.defaultStatus.id) {
      // this.userService.createUserAndCompany(this.user, this.company, this.password);
    } else {
      this.notCompleted = true;
    }
  }

  save(event) {
    event.preventDefault();
    this.company.defaultStatus = this.statuses.find(item => item.id === this.statusId);
    this.companyService.editCompany(this.company);
  }

  reset() {
    this.company = this.companyCache;
  }
}
