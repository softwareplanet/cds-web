import {Component, OnInit} from '@angular/core';
import {Status} from '../../../models/status';
import {StatusService} from '../../../services/status.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrls: ['./create-status.component.scss']
})
export class CreateStatusComponent implements OnInit {

  constructor(private statusService: StatusService,
              private notificationService: SnotifyService) {
  }

  public nameNotEntered = false;
  public creating = false;
  public status: Status;

  ngOnInit() {
    this.status = new Status();
  }

  exitCreatingMode() {
    this.creating = false;
    this.status = new Status();
  }

  enterCreatingMode() {
    this.creating = true;
  }

  createStatus(event) {
    event.preventDefault();
    if (!this.validate()) {
      this.nameNotEntered = true;
      this.notificationService.warning('Name must not be blank');
      return;
    }
    this.statusService.createStatus(this.status);
    this.status = new Status();

    this.creating = false;
  }

  validate() {
    return (this.status.title && this.status.title !== '');
  }
}
