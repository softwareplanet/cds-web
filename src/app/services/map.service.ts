import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MapService {

  private urlModifier = 'assignee/';

  constructor(private http: HttpClient) {
  }

  getPipelinePoints(assigneeId: number, date: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date);
    return this.http.get(environment.apiHost + this.urlModifier + assigneeId + '/location', {params});
  }

  getLastPositions(): Observable<any> {
    return this.http.get(environment.apiHost + this.urlModifier + 'location/last');
  }

  getLocation(): Observable<{ latitude: number, longitude: number }> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          });
      }
    });
  }
}
