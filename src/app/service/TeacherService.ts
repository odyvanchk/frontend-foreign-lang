import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { BASE_URL } from "../env";
import { toFormData } from "../validators/utils/utils";


@Injectable()
export class TeacherService {
  
    constructor(private http: HttpClient) {}

   postInfo(teacherInfoForm: FormGroup) :Observable<any> {
        let formModel =  toFormData(teacherInfoForm.value)
    //todo id retrieve
         let id = 1;
        return this.http
        .post(`${BASE_URL}/teachers/${id}`, formModel);
  }  

}