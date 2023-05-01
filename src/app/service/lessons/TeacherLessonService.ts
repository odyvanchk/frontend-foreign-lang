import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../../env";
import { PageEvent } from "@angular/material/paginator";
import { ILesson } from "../../components/teacher/teachers-lessons/teachers-lessons.component";



@Injectable()
export class TeacherLessonService {
    
    constructor(private http: HttpClient) {}

    getFuture(event: PageEvent) :Observable<any> {
        return this.http
            .get(`${BASE_URL}/teachers/${localStorage.getItem('id')}/lessons/future`, 
                {params: {page: event.pageIndex}});
    }

    getPast(event: PageEvent) :Observable<any> {
        return this.http
            .get(`${BASE_URL}/teachers/${localStorage.getItem('id')}/lessons/past`, 
                {params: {page: event.pageIndex}});
    }
    
    cancel(lesson: ILesson) : Observable<any> {
        return this.http
            .get(`${BASE_URL}/lessons/${lesson.id}/cancelByTeacher`);
    }
  
}