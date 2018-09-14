import {Status} from './status';
import {Job} from './job';

export class LocationPoint {
  latitude: string;
  longitude: string;
  date: string;
  job?: Job;
  status?: Status;
  username?: string;

  constructor(location: { latitude: string, longitude: string }) {
    this.longitude = location.longitude;
    this.latitude = location.latitude;
    this.date = null;
  }
}
