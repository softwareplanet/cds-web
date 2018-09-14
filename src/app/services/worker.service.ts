import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './auth/authentication-service.service';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';

@Injectable()
export class WorkerService {
  private urlModifier = 'users/';
  private workersArr: User[] = null;
  public workers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  public workersView: BehaviorSubject<{ user: User, label: string }[]> = new BehaviorSubject<{ user: User, label: string }[]>(null);
  public workersViewArr: { user: User, label: string }[] = [];

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private router: Router,
              private notification: SnotifyService) {
    this.getWorkers();
  }

  getWorkers(): Observable<any> {
    this.http.get(environment.apiHost + this.urlModifier)
      .map(res => <User[]>res)
      .subscribe(workers => {
        this.workersViewArr = [];
        workers.forEach((worker) => {
          this.workersViewArr.push({user: worker, label: worker.workLoad + ' | ' + worker.lastName});
        });
        this.workersView.next(this.workersViewArr);
        this.workersArr = <User[]> workers;
        this.workers.next(<User[]> workers);
      });
    return this.workers;
  }

  createUser(user: any, password: string) {
    user.password = password;
    this.http.post(environment.apiHost + 'users/', user)
      .subscribe(createdUser => {
        this.workersArr.push(<User>createdUser);
        this.workers.next(this.workersArr);
        this.notification.success('User was successfully created');
      }, error => {
        this.notification.error('Something went wrong.\nUser was not successfully created');
      });
  }

  createUserAndCompany(user: User, company: { name: string, website: string}, password: string) {
    const userWithCompany = {company: company, password: password, username: user.username};

    for (const key of Object.keys(user)) {
      userWithCompany[key] = user[key];
    }

    this.http.post(environment.apiHost + 'company', userWithCompany).subscribe(createdUser => {
      this.authService.authorise(userWithCompany.username, userWithCompany.password)
        .then((res) => {
          this.router.navigate(['dashboard']);
        });
    });
  }

  reassignWorker(newWorkerId, oldWorkerId) {
    const iNew = this.workersViewArr.findIndex(item => item.user.id === newWorkerId);
    const iOld = this.workersViewArr.findIndex(item => item.user.id === oldWorkerId);
    if (oldWorkerId) {
      this.workersViewArr[iOld].user.workLoad -= 1;
      this.workersViewArr[iOld].label = this.workersViewArr[iOld].user.workLoad + ' | ' + this.workersViewArr[iOld].user.lastName;
    }
    this.workersViewArr[iNew].user.workLoad += 1;
    this.workersViewArr[iNew].label = this.workersViewArr[iNew].user.workLoad + ' | ' + this.workersViewArr[iNew].user.lastName;
    this.workersView.next(this.workersViewArr);
  }
}
