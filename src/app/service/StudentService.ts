import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../env";


@Injectable()
export class StudentService {

  constructor(private http: HttpClient) {}

  addToBlackList(teacherId: number) : Observable<any> {
    return this.http
    .post(`${BASE_URL}/students/${localStorage.getItem('id')}/blacklist`,  teacherId);
  }

}