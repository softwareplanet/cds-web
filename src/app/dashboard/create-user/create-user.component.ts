import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {WorkerService} from '../../services/worker.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user: User = new User();

  constructor(private userService: WorkerService) {
  }

  ngOnInit() {
  }

  createUser(password) {
    this.userService.createUser(this.user, password);
  }
}
