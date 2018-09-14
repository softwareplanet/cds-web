import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {WorkerService} from '../services/worker.service';
import {MapService} from '../services/map.service';
import {LocationPoint} from '../models/locationPoint';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {
  public workers: User[];
  public currentLocation: { latitude: number, longitude: number } = {latitude: null, longitude: null};
  public markers: LocationPoint[];
  public points: LocationPoint[];
  public workerId: number;
  public date: string;
  public typeOfMapView = 'lastWorkersLocation';

  constructor(private workerService: WorkerService,
              private mapService: MapService,
              private notification: SnotifyService) {
  }

  ngOnInit() {
    this.workerService.workers.subscribe(workers => this.workers = workers);
    this.showLastPositions();
  }

  ngAfterViewInit() {
    this.mapService.getLocation().subscribe(location => {
      this.currentLocation = location;
      this.date = this.setCurrentDate();
    });
  }

  private setCurrentDate() {
    const createDate = new Date();
    return (createDate.getFullYear() + '-'
      + ('0' + (createDate.getMonth() + 1)).slice(-2) + '-'
      + ('0' + createDate.getDate()).slice(-2));
  }

  showLastPositions() {
    this.points = null;
    this.getLastPositionOfWorkers();
  }

  private getLastPositionOfWorkers() {
    this.mapService.getLastPositions()
      .subscribe((lastPositionOfWorker: { latitude: string, longitude: string, date: string, username: string }[]) => {
        this.markers = [];
        lastPositionOfWorker.forEach(item => {
          this.markers.push({
            latitude: item.latitude,
            longitude: item.longitude,
            date: new Date(item.date).toString().slice(0, -16),
            username: item.username,
          });
        });

      });
  }

  showPolylineForChosenUser(worker: User) {
    this.workerId = worker.id;
    const self = this;
    self.getPointsForUser(this.workerId, this.date);
  }

  showPolylineForChosenDay(date: string) {
    const self = this;
    this.date = date;
    self.getPointsForUser(this.workerId, this.date);
  }

  getPointsForUser(workerId: number, date: string) {
    this.mapService.getPipelinePoints(workerId, date).subscribe(locationPoints => {
      this.points = this.getSortedPointsByDate(locationPoints);
      this.markers = this.getMarkers(this.points);
      this.points = locationPoints;
    }, ({error}) => {
      this.points = null;
      this.markers = null;
      this.notification.error(error.errors.toString());
    });
  }

  getSortedPointsByDate(locationPoints: LocationPoint[]): LocationPoint[] {
    return locationPoints.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
  }

  getMarkers(locationPoints: LocationPoint[]): LocationPoint[] {
    return locationPoints.filter((locationPoint: LocationPoint) => locationPoint.status)
      .map((marker: LocationPoint) => {
        console.log(marker.date);
        marker.date = this.formatDate(marker.date);
        return marker;
      });
  }

  private formatDate(date) {
    return new Date(date).toTimeString();
  }

  public removeAllFromMap() {
    this.points = null;
    this.markers = null;
  }

  generateInfoTitle(marker: LocationPoint) {
    return (marker.username)
      ? (marker.username + '\n' + marker.date)
      : ('\nJob number: ' + marker.job.id
        + '\nChange status to: '
        + marker.status.title
        + '\nAt: ' + marker.date.slice(0, -16));
  }
}


