import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Job} from '../models/job';
import {JobService} from '../services/job.service';
import {WorkerService} from '../services/worker.service';
import {StatusService} from '../services/status.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  public jobs: Job[] = null;
  public transitionsShow: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public workers: User[] = [];

  constructor(private jobService: JobService,
              public statusService: StatusService) {
  }

  ngOnInit() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs ? jobs.sort((a, b) => a.id - b.id) : jobs;
    });
  }

  getTransitions(job) {
    if (job.status) {
      return this.statusService.getTransitionsForStatus(job.status.id);
    }
    return [];
  }

  closeOther(jobId) {
    this.transitionsShow.next(jobId);
  }
}
