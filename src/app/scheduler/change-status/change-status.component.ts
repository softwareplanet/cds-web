import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobService} from '../../services/job.service';
import {Status} from '../../models/status';
import {Transition} from '../../models/transition';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {

  constructor(private jobService: JobService) {
  }

  @Input() status;
  @Input() transitions;
  @Input() jobId;
  @Input() transitionShow;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  public show = false;
  public firstTransition: Transition;

  ngOnInit() {
    this.firstTransition = this.transitions[0];
    this.status = this.status ? this.status : new Status();
    this.transitions = this.transitions ? this.transitions : [];
    this.transitionShow.subscribe(jobId => {
      if (jobId) {
        if (this.jobId === jobId) {
          this.show = !this.show;
        } else {
          this.show = false;
        }
      }
    });
  }

  changeStatus(statusTo) {
    this.jobService.changeStatus(this.jobId, statusTo.id);
    this.transitionShow.next(null);
  }

  changeShow() {
    this.selected.emit(this.jobId);
  }
}
