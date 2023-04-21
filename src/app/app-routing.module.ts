import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { TimeslotsComponent } from './components/timeslots/timeslots.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'hello', component: HelloComponent},
  { path: 'teachers/info', component: TeacherInfoComponent},
  { path: 'schedule', component: TimeslotsComponent},
  { path: 'profile', component: ProfileComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
