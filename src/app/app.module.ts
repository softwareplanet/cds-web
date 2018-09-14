import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateJobComponent} from './dashboard/create-job/create-job.component';
import {SchedulerComponent} from './scheduler/scheduler.component';
import {NavigatedContainerComponent} from './navigated-container/navigated-container.component';
import {JobService} from './services/job.service';
import {WorkersAutocompleteComponent} from './scheduler/workers-autocomplite/workers-autocomplete.component';
import {WorkerService} from './services/worker.service';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import {ChangeStatusComponent} from './scheduler/change-status/change-status.component';
import {StatusService} from './services/status.service';
import {CreateStatusComponent} from './dashboard/manage-statuses/create-status/create-status.component';
import {DashNavBarComponent} from './dashboard/dash-nav-bar/dash-nav-bar.component';
import {ManageStatusesComponent} from './dashboard/manage-statuses/manage-statuses.component';
import {StatusesFlowComponent} from './dashboard/manage-statuses/statuses-flow/statuses-flow.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {CompanyCreatingComponent} from './company-creating/company-creating.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {TokenInterceptor} from './services/auth/Interceptor';
import {AuthenticationService} from './services/auth/authentication-service.service';
import {UserCreatingComponent} from './auth/user-creating/user-creating.component';
import {CreateUserComponent} from './dashboard/create-user/create-user.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {AgmCoreModule} from '@agm/core';
import {MapsComponent} from './maps/maps.component';
import {MapService} from './services/map.service';
import {environment} from '../environments/environment';
import { FilterComponent } from './scheduler/filter/filter.component';
import { CompanyEditingComponent } from './dashboard/company-editing/company-editing.component';
import {CompanyService} from './services/company.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateJobComponent,
    SchedulerComponent,
    WorkersAutocompleteComponent,
    NavigatedContainerComponent,
    ChangeStatusComponent,
    CreateStatusComponent,
    DashNavBarComponent,
    ManageStatusesComponent,
    StatusesFlowComponent,
    CompanyCreatingComponent,
    AuthComponent,
    LoginComponent,
    UserCreatingComponent,
    CreateUserComponent,
    MapsComponent,
    FilterComponent,
    CompanyEditingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forRoot(ROUTES),
    BsDropdownModule.forRoot(),
    SnotifyModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ],
  providers: [
    JobService,
    WorkerService,
    StatusService,
    CompanyService,
    MapService,
    {
      provide: 'SnotifyToastConfig',
      useValue: ToastDefaults
    },
    SnotifyService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
