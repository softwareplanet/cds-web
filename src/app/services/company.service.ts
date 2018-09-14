import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnotifyService} from 'ng-snotify';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CompanyService {

  public company: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private notification: SnotifyService) { }

  getCompany() {
    this.http.get(environment.apiHost + 'company')
      .subscribe(company => {
        this.company.next(company);
      });

    return this.company;
  }

  editCompany(company) {
    this.http.patch(environment.apiHost + 'company', company)
      .subscribe(updatedCompany => {
        this.notification.success('Company information has changed.');
        this.company.next(updatedCompany);
      });
  }
}
