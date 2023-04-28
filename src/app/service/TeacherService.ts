import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { BASE_URL } from "../env";
import { toFormData } from "../validators/utils/utils";
import { PageEvent } from "@angular/material/paginator";


@Injectable()
export class TeacherService {

    constructor(private http: HttpClient) {}

   postInfo(teacherInfoForm: FormGroup) :Observable<any> {
        let formModel =  toFormData(teacherInfoForm.value)
    //todo id retrieve
        //  let id = 8;
         let id = localStorage.getItem('id');
        return this.http
        .post(`${BASE_URL}/teachers/${id}`, formModel);
  }  

  search(searchCriteria: any) :Observable<any> {
    return this.http
    .get(`${BASE_URL}/teachers/search`, {params: searchCriteria});
  }

  searchByPage(searchCriteria: any, event: PageEvent) :Observable<any> {
        searchCriteria.page = event.pageIndex;
    return this.http
    .get(`${BASE_URL}/teachers/search`, {params: searchCriteria});
  }

  getById(id: number) :Observable<any> {
    return this.http
    .get(`${BASE_URL}/teachers/${id}`);
  }
  

}