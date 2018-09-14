import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Transition} from '../models/transition';
import {Status} from '../models/status';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SnotifyService} from 'ng-snotify';

@Injectable()
export class StatusService {

  private urlModifier = 'statuses/';
  private transitions: Transition[] = [];
  private status: BehaviorSubject<Status> = new BehaviorSubject<Status>(null);
  private statusObj: Status = null;
  private statuses: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>(null);
  private statusesArr: Status[] = [];

  constructor(private http: HttpClient, private notification: SnotifyService) {
    this.getTransitions();
  }

  private getTransitions(): void {
    this.http.get(environment.apiHost + this.urlModifier + 'transitions')
      .map(transitions => <Transition[]>transitions)
      .subscribe(transitions => {
        this.transitions = transitions;
      });
  }

  getTransitionsForStatus(statusId: number): Transition[] {
    return this.transitions.filter(transition => transition.statusFrom.id === statusId);
  }

  createStatus(status: Status) {
    this.http.post(environment.apiHost + this.urlModifier, status)
      .subscribe(newStatus => {
        if (newStatus) {
          this.status.next(<Status> newStatus);
          this.statusObj = <Status> newStatus;

          this.statusesArr.push(<Status>newStatus);
          this.statuses.next(this.statusesArr);
          this.notification.success('Status was successfully created');
        }
      }, (error) => {
        this.notification.error('Something went wrong, status was not created');
      });
    return this.status;
  }

  getStatuses() {
    this.http.get(environment.apiHost + this.urlModifier).subscribe(statuses => {
      this.statusesArr = <Status[]> statuses;
      this.statuses.next(this.statusesArr);
    });
    return this.statuses;
  }

  saveFlow(id: number, transitions: Transition[]) {
    this.transitions = transitions;
    this.http.post(environment.apiHost + this.urlModifier + 'transitions/?from=' + id, transitions)
      .subscribe(() => {
        this.notification.success('Status transitions were saved');
      });
  }
}
