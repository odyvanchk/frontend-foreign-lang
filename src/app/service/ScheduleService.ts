import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { BASE_URL } from "../env";
import { toFormData } from "../validators/utils/utils";


@Injectable()
export class ScheduleService {

  
    constructor(private http: HttpClient) {}
  
  
  get(teacherId: number, start: number, finish: number)  :Observable<any> {
    return this.http
    .get(`${BASE_URL}/schedule/${teacherId}`, {params: {start: start, finish: finish}});
  }

  book(teacherId: number, arr: number[]) : Observable<any> {
    return this.http
    .post(`${BASE_URL}/schedule/${teacherId}/book`, arr);
  }

}