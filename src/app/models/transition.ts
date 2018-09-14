import {Status} from './status';

export class Transition {
  id: number;
  action: string;
  statusFrom: Status;
  statusTo: Status;
}
