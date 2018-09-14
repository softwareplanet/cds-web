import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SchedulerComponent} from './scheduler/scheduler.component';
import {CreateJobComponent} from './dashboard/create-job/create-job.component';
import {ManageStatusesComponent} from './dashboard/manage-statuses/manage-statuses.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {CompanyCreatingComponent} from './company-creating/company-creating.component';
import {CreateUserComponent} from './dashboard/create-user/create-user.component';
import {MapsComponent} from './maps/maps.component';
import {CompanyEditingComponent} from './dashboard/company-editing/company-editing.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: CompanyCreatingComponent}
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'create-job', pathMatch: 'full'},
      {path: 'create-job', component: CreateJobComponent},
      {path: 'manage-statuses', component: ManageStatusesComponent},
      {path: 'create-user', component: CreateUserComponent},
      {path: 'edit-company', component: CompanyEditingComponent}
    ]
  },
  {path: 'scheduler', component: SchedulerComponent},
  {path: 'map', component: MapsComponent}
];
