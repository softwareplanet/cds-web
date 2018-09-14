import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SnotifyService} from 'ng-snotify';

@Injectable()
export class AuthenticationService {

  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getToken());


  constructor(private http: HttpClient, private notification: SnotifyService) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authorized;
  }

  public authorise(username: string, password: string): Promise<any> {
    return this.http.post(environment.apiHost + 'auth', {username: username, password: password})
      .toPromise()
      .then((response: { token: string }) => {
        localStorage.setItem('token', response.token);
        this.authorized.next(true);
        this.notification.success('Welcome!', {showProgressBar: false});
      })
      .catch((res) => {
        console.log(res);
        this.notification.error(res.error.errors.toString());
      });
  }

  public logout() {
    localStorage.removeItem('token');
    this.authorized.next(false);
    this.notification.info('Bye!', {showProgressBar: false});
  }
}
