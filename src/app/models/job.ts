import {Status} from './status';
import {User} from './user';

export class Job {
  id: number;
  title: string;
  description: string;
  location: string;
  customerName: string;
  phones: {
    number: string,
    type: string
  }[];
  assignee: User;
  eMail: string;
  dueDate: Date;
  status: Status;
}
