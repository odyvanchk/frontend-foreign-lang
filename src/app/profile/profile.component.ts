import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  teacher: boolean;
  student: boolean;

  constructor() {
    this.teacher = localStorage.getItem("teacher") == 'true'
    this.student = localStorage.getItem("student") == 'true'
   }

  ngOnInit(): void {
  }

}
