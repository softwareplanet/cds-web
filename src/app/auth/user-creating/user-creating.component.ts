import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnotifyService} from 'ng-snotify';


@Component({
  selector: 'app-user-creating',
  templateUrl: './user-creating.component.html',
  styleUrls: ['./user-creating.component.scss']
})
export class UserCreatingComponent implements OnInit {

  constructor(private notificationService: SnotifyService) {
  }


  @Input() user;
  @Input() userFilled;
  @Input() password;
  @Input() buttonLabel;
  @Input() button2Label;

  @Output() userfilled: EventEmitter<any> = new EventEmitter<any>();
  @Output() __cancel: EventEmitter<any> = new EventEmitter<any>();

  public confirmPassword: string;
  public notCompleted: boolean;

  ngOnInit() {
    this.notCompleted = false;
  }

  validation() {
    this.notCompleted = false;

    if (!this.user.lastName || !this.user.firstName || !this.user.eMail || !this.user.username) {
      this.notCompleted = true;
    }
    if (this.password === '' || this.confirmPassword !== this.password) {
      this.notCompleted = true;
    }

    if (this.notCompleted) {
      this.notificationService.warning('Fields must not be blank');
    }
  }

  complete() {
    this.validation();

    if (!this.notCompleted) {
      this.userfilled.emit(this.password);
    }
  }

  cancel() {
    this.__cancel.emit();
  }
}
