import { Component, OnInit } from '@angular/core';
import {JobService} from '../../services/job.service';
import {User} from '../../models/user';
import {WorkerService} from '../../services/worker.service';
import {StatusService} from '../../services/status.service';
import {Status} from '../../models/status';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public filterBy: string;
  public users: User[];
  public id: number;
  public statuses: Status[];
  public items: {title: string, id: number}[];

  constructor(private jobsService: JobService,
              private userService: WorkerService,
              private statusService: StatusService) { }

  ngOnInit() {
    this.filterBy = 'all';

    this.userService.getWorkers()
      .subscribe(users => this.users = users);
    this.statusService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }

  filter() {
    if (this.filterBy === 'byAssignee') {
      this.items = this.users.map(user => {
        return {id: user.id, title: user.lastName};
      });
    }
    if (this.filterBy === 'byStatus') {
      this.items = this.statuses.map(status => {
        return {title: status.title, id: status.id};
      });
    }

    this.id = null;
    this.getItems();
  }

  getItems() {
    if (!this.id) {
      if (this.items[0]) {
        this.id = this.items[0].id;
      }
    }
    if (this.filterBy === 'byAssignee') {
      this.jobsService.getJobsByAssigneeId(this.id);
    }
    if (this.filterBy === 'byStatus') {
      this.jobsService.getJobsByStatusId(this.id);
    }
    if (this.filterBy === 'all') {
      this.jobsService.getJobs();
    }
  }
}
