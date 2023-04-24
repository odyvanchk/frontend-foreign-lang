import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { TeacherInfoComponent } from './components/teacher/teacher-info/teacher-info.component';
import { TimeslotsComponent } from './components/schedule/timeslots/timeslots.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { TeachersListComponent } from './components/teacher/teachers-list/teachers-list.component';

const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'hello', component: HelloComponent},
  { path: 'teachers/info', component: TeacherInfoComponent},
  { path: 'teachers/:id/schedule/book', component: TimeslotsComponent},
  { path: 'teachers', component: TeachersListComponent},
  { path: 'search', component: SearchFilterComponent},
  { path: 'schedule', component: TimeslotsComponent},
  { path: 'profile', component: ProfileComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
