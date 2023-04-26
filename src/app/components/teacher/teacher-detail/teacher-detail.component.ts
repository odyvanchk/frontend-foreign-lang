import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../service/ScheduleService';
import { ITeacherInfo, TeacherInfo } from '../teachers-list/teachers-list.component';
import { TeacherService } from '../../../service/TeacherService';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {
  id!: number;
  info! : ITeacherInfo;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService) { 
    this.route.params.subscribe( params => this.id = params['id'] );
  }

  ngOnInit(): void {
      this.teacherService
      .getById(this.id)
      .subscribe({
        next: (res) => {
          this.info = new TeacherInfo(res);
      },
      error: (res) => {
          alert("error")
      }
    });
  }

}
