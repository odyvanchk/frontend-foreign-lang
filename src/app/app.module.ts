import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthApiService } from './service/AuthApiService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interseptors/interseptor';
import { LoginComponent } from './components/login/login.component';
import { HelloComponent } from './components/hello/hello.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { TeacherService } from './service/TeacherService';
import { HeaderComponent } from './components/header/header.component';
import { TimeslotsComponent } from './components/timeslots/timeslots.component';
import { TeacherCabinetComponent } from './teacher-cabinet/teacher-cabinet.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HelloComponent,
    TeacherInfoComponent,
    HeaderComponent,
    TimeslotsComponent,
    TeacherCabinetComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthApiService,
    TeacherService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
