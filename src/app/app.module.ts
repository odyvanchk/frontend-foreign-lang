import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { AuthApiService } from './service/AuthApiService';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interseptors/interseptor';
import { LoginComponent } from './components/auth/login/login.component';
import { TeacherInfoComponent } from './components/teacher/teacher-info/teacher-info.component';
import { TeacherService } from './service/TeacherService';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { TimeslotsComponent } from './components/schedule/timeslots/timeslots.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { MatOptionModule } from '@angular/material/core';
import { TeachersListComponent } from './components/teacher/teachers-list/teachers-list.component';
import { TeacherScheduleComponent } from './components/schedule/teacher-schedule/teacher-schedule.component';
import { ScheduleService } from './service/ScheduleService';
import { TeacherDetailComponent } from './components/teacher/teacher-detail/teacher-detail.component';
import { StudentService } from './service/StudentService';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TeachersLessonsComponent } from './components/teacher/teachers-lessons/teachers-lessons.component';
import { TeacherLessonService } from './service/lessons/TeacherLessonService';
import { StudentLessonService } from './service/lessons/StudentLessonService';
import { MatSelectModule } from '@angular/material/select';
import { SettingsService } from './service/SettingsService';
import '@angular/common/locales/global/ru'
import { LocaleService } from '../local';
import { LocaleId } from './LocaleId';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    TeacherInfoComponent,
    HeaderComponent,
    TimeslotsComponent,
    ProfileComponent,
    SearchFilterComponent,
    TeachersListComponent,
    TeacherScheduleComponent,
    TeacherDetailComponent,
    TeachersLessonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatOptionModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http, './assets/i18n/', '.json');},
          deps: [HttpClient]
        }
      }
    )
  ],
  providers: [
    AuthApiService,
    TeacherService,
    ScheduleService,
    StudentService,
    TeacherLessonService,
    StudentLessonService,
    SettingsService,
    LocaleService,
    {
      provide: LOCALE_ID,
      useClass: LocaleId,
      deps: [LocaleService],      
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
