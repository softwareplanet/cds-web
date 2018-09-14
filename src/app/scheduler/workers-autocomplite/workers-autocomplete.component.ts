import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {JobService} from '../../services/job.service';
import {WorkerService} from '../../services/worker.service';
import {Job} from '../../models/job';

@Component({
  selector: 'app-workers-autocomplete',
  templateUrl: './workers-autocomplete.component.html',
  styleUrls: ['./workers-autocomplete.component.scss']
})
export class WorkersAutocompleteComponent implements OnInit {
  @Input() job: Job;
  @Input() workerId: number;

  private currentWorker: number;
  public workersView = [];

  constructor(private jobService: JobService, private workerService: WorkerService) {
  }

  ngOnInit() {
    this.currentWorker = this.workerId;
    this.workerService.workersView.subscribe( workers => this.workersView = workers);
  }

  assignWorker(event) {
    if (this.workerId !== event.user.id) {
      this.jobService.assign(this.job, event.user.id);
      this.workerService.reassignWorker(event.user.id, this.currentWorker);
      this.currentWorker = event.user.id;
    }
  }
}
