import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TeacherLessonService } from '../../../service/lessons/TeacherLessonService';
import { PageEvent } from '@angular/material/paginator';
import { setUTCZoneToDate } from '../../schedule/teacher-schedule/teacher-schedule.component';

export interface ILesson {
  id: number;
  idTeacher: number;
  idStudent: number;
  dateTime: Date;
  status: string;
  note : string
}

class Lesson implements ILesson {
  id: number;
  idTeacher: number;
  idStudent: number;
  dateTime: Date;
  status: string;
  note: string;

  constructor (data : any) { 
    this.id = data['id']
    this.idTeacher = data['idTeacher']
    this.idStudent = data['idStudent']
    this.dateTime = data['dateTime']
    this.status = data['status']
    this.note = data['note']
  }
  
}

@Component({
  selector: 'app-teachers-lessons',
  templateUrl: './teachers-lessons.component.html',
  styleUrls: ['./teachers-lessons.component.css']
})
export class TeachersLessonsComponent implements OnInit {


  lessonsList! : ILesson[];
  totalCount!: number;
  pageSize!: number;
  currentPage!: number;
  pageEvent!: PageEvent;
  futureBtnActive: boolean = true;
FutureColor: string = 'accent';

  constructor(@Inject(LOCALE_ID) public locale: string, private lessonService: TeacherLessonService) { }

  ngOnInit(): void {
    this.getServerData(this.defaultPageEvent())
  }

  getServerData(event: PageEvent): any {
    if (this.futureBtnActive) {
     this.getFuture(event)
    } else {
     this.getPast(event)
    }
    
  }  
  defaultPageEvent() : PageEvent {
    let event = new PageEvent();
    event.pageIndex = 0;
    return event;
  }

  cancelLesson(lesson: ILesson) {
    if (new Date(lesson.dateTime).getTime() - new Date().getTime() < 14400000) {
      alert ("error. you cannot cancel a lesson in less than 4 hours")
      return;
    }
    this.lessonService
    .cancel(lesson)
    .subscribe({
      next: (res) => {
        alert("was cancelled")
    },
    error: (res) => {
        alert("error")
    }
    });
  }

  setUTCZoneToDate(res: any) {
    res.forEach((element: any) => {
      element.dateTime = new Date(element.dateTime + '.000Z');
    });
  }

  getPast(event: PageEvent) {
    this.lessonService
    .getPast(event)
    .subscribe({
      next: (res) => {
        this.setUTCZoneToDate(res.lessons);
        let d : ILesson[] = [];
        res.lessons.forEach((lesson: any) => {
            d.push(new Lesson(lesson))
        })
      this.lessonsList = d;
      this.currentPage = res.currentPage;
      this.totalCount = res.totalCount;
      this.pageSize = res.pageSize;
      this.futureBtnActive = false; 

    },
    error: (res) => {
        alert("error")
    }
    });
  }
  
  getFuture(event : PageEvent) {
    this.lessonService
    .getFuture(event)
    .subscribe({
      next: (res) => {
        this.setUTCZoneToDate(res.lessons);
        let d : ILesson[] = [];
        res.lessons.forEach((lesson: any) => {
            d.push(new Lesson(lesson))
        })
      this.lessonsList = d;
      this.currentPage = res.currentPage;
      this.totalCount = res.totalCount;
      this.pageSize = res.pageSize;
       this.futureBtnActive = true; 
    },
    error: (res) => {
        alert("error")
    }
    });
  }

}
