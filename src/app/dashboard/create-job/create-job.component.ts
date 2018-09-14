import {Component, OnInit} from '@angular/core';
import {JobService} from '../../services/job.service';
import {Job} from '../../models/job';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  public phone: { number: string, type: string };
  public form: Job;
  public created = false;
  public createdJob: Job;

  public toHidden = '';
  public fromHidden = '';

  constructor(private jobService: JobService,
              private router: Router,
              private notificationService: SnotifyService) {
  }

  ngOnInit() {
    this.form = new Job();
    this.form.phones = [];
    this.phone = {number: '', type: ''};
  }

  addPhone() {
    this.form.phones.push(this.phone);
    this.phone = {number: '', type: ''};

  }

  addPhoneFromEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      this.addPhone();
    }
  }

  createJob() {
    if (!this.validate()) {
      this.notificationService.warning('Title must not be blank');
      return;
    }
    this.jobService.createJob(<Job> this.form).subscribe(createdJob => {
      this.createdJob = createdJob;
      this.toHidden = 'toHidden';
      for (const key in this.form) {
        this.form[key] = '';
      }
      this.form.phones = [];
      this.phone = {number: '', type: ''};
      setTimeout(() => {
        this.created = true;
      }, 800);
    });
  }

  removePhone(phone) {
    this.form.phones = this.form.phones.filter(number => number.number !== phone.number);
  }

  goToScheduler() {
    this.router.navigate(['scheduler']);
  }

  hideInfo() {
    this.toHidden = '';
    setTimeout(() => {
      this.created = false;
      this.fromHidden = 'fromHidden';
    }, 800);
  }

  validate() {
    return (this.form.title && this.form.title);
  }
}

