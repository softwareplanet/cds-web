import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../models/job';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {SnotifyService} from 'ng-snotify';
import {Subject} from 'rxjs/Subject';
import {User} from '../models/user';


@Injectable()
export class JobService {
  private urlModifier = 'jobs/';
  private jobsArr: Job[] = [];
  public jobs: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
  public jobObj = new Job();
  public job: Subject<Job> = new Subject<Job>();

  constructor(private http: HttpClient, private notification: SnotifyService) {
  }


  getJobs(): Observable<Job[]> {
    this.http.get(environment.apiHost + this.urlModifier)
      .map(response => <Job[]>response)
      .subscribe(jobs => {
        jobs.forEach(job => job.dueDate = new Date(job.dueDate));
        this.jobsArr = jobs;
        this.jobs.next(this.jobsArr);
      });
    return this.jobs;
  }

  getJobsByAssigneeId(assigneeId: number): Observable<Job[]> {
    this.http.get(environment.apiHost + this.urlModifier + 'assignee/' + assigneeId)
      .map(response => <Job[]> response)
      .subscribe(jobs => {
         jobs.forEach(job => job.dueDate = new Date(job.dueDate));
         this.jobsArr = jobs;
         this.jobs.next(this.jobsArr);
      });
    return this.jobs;
  }

  getJobsByStatusId(statusId: number) {
    this.http.get(environment.apiHost + this.urlModifier + 'status/' + statusId)
      .map(response => <Job[]> response)
      .subscribe(jobs => {
        jobs.forEach(job => job.dueDate = new Date(job.dueDate));
        this.jobsArr = jobs;
        this.jobs.next(this.jobsArr);
      });
    return this.jobs;
  }

  createJob(job: Job): Observable<any> {
    this.http.post(environment.apiHost + this.urlModifier, job)
      .subscribe(createdJob => {
        if (createdJob) {
          this.jobObj = <Job>createdJob;
          this.jobObj.dueDate = new Date(this.jobObj.dueDate);
          this.jobsArr.push(this.jobObj);
          this.jobs.next(this.jobsArr);
          this.job.next(this.jobObj);
        }
      });
    return this.job;
  }

  assign(job: Job, workerId: number): void {
    this.changeJob(job.id, workerId, 'put', '/assignee/', 'Courier was assigned');
  }

  changeStatus(jobId: number, statusId: number): void {
    this.changeJob(jobId, statusId, 'patch', '/status/', 'Status has changed');
  }

  private changeJob(jobId: number, itemId: number, method: string, route: string, message: string) {
    this.http[method](environment.apiHost + this.urlModifier + jobId + route, {id: itemId})
      .map(job => <Job>job)
      .subscribe((job) => {
        this.jobsArr.forEach((jobInArr, index, array) => {
          if (jobInArr.id === job.id) {
            job.dueDate = new Date(job.dueDate);
            array[index] = job;
          }
        });
        this.notification.success(message);
      }, (error) => {
        this.notification.error(error.message);
      });
  }

}

