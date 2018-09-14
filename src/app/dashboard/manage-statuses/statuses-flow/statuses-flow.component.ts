import {Component, OnInit} from '@angular/core';
import {Status} from '../../../models/status';
import {StatusService} from '../../../services/status.service';
import {Transition} from '../../../models/transition';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-statuses-flow',
  templateUrl: './statuses-flow.component.html',
  styleUrls: ['./statuses-flow.component.scss']
})
export class StatusesFlowComponent implements OnInit {

  constructor(private statusService: StatusService, private notificationService: SnotifyService) {
  }

  public currentStatus: Status = new Status();
  public statuses: Status[] = [];
  public otherStatuses: { status: Status, action: string, checked: boolean, notFilled: boolean }[] = [];
  private transitions: Transition[] = [];

  ngOnInit() {
    this.statusService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;
      if (this.statuses) {
        if (statuses[0]) {
          this.setCurrentStatus(statuses[0].id);
        }
      }
    });
  }

  setCurrentStatus(id: number) {
    if (this.statuses) {
      this.currentStatus = this.statuses.find(status => status.id === id);

      const temp = this.statuses.filter(status => status.id !== id);
      this.otherStatuses = [];

      temp.forEach((status) => {
        this.otherStatuses.push({status: status, action: '', checked: false, notFilled: false});
      });

      this.transitions = this.statusService.getTransitionsForStatus(this.currentStatus.id);
      this.transitions.forEach(transition => {
        const index = this.otherStatuses.findIndex(status => status.status.id === transition.statusTo.id);
        this.otherStatuses[index].action = transition.action;
        this.otherStatuses[index].checked = true;
      });
    }
  }

  saveFlow() {
    if (!this.validate()) {
      return;
    }
    this.otherStatuses = this.otherStatuses.filter(status => status.checked);
    this.transitions = this.transitions.filter(transition => {
      const status = this.otherStatuses.find(item => item.status.id === transition.statusTo.id);
      return transition.statusTo.id === (status ? status.status.id : -1);
    });
    this.otherStatuses.forEach(status => {
      const index = this.transitions.findIndex((transition) => transition.statusTo.id === status.status.id);
      if (index !== -1) {
        this.transitions[index].action = status.action;
      } else {
        this.transitions.push({statusFrom: this.currentStatus, action: status.action, statusTo: status.status, id: null});
      }
    });
    this.statusService.saveFlow(this.currentStatus.id, this.transitions);

    this.setCurrentStatus(this.currentStatus.id);
  }

  validate() {
    let result = true;
    this.otherStatuses.forEach(status => {
      if (status.checked && (!status.action || status.action === '')) {
        result = false;
        status.notFilled = true;
      }
    });
    if (!result) {
      this.notificationService.warning('Actions must not be blank');
    }
    return result;
  }
}
