import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../../service/StudentService';

export interface ITeacherInfo {
  id: number;
  country: string,
  experience: number,
  isNative: boolean,
  level: string,
  description: string,
  defaultPrice: number,
  language: string,
  mark: number,
  login: string,
  photoRef: string
}

export class TeacherInfo implements ITeacherInfo {

  id: number;
  country: string;
  experience: number;
  isNative: boolean;
  level: string;
  defaultPrice: number;
  language: string;
  mark: number;  
  description: string;
  login: string;
  photoRef: string;
  // constructor(id : number, country: string, experience: number,
  //   isNative: boolean,
  //   level: string,
  //   defaultPrice: number,
  //   language: string,
  //   mark: number,  
  //   description: string) {
  //     this.id = id;
  //     this.country = country;
  //     this.experience = experience;
  //     this.isNative = isNative;
  //     this.level = level;
  //     this.defaultPrice = defaultPrice;
  //     this.language = language;
  //     this.mark = mark;  
  //     this.description = description;
  //   }

    constructor(data: any) {
      this.id = data['id'];
      this.country = data['country'];
      this.experience = data['experience'];
      this.isNative = data['isNative'];
      this.level = data['level'];
      this.defaultPrice = data['defaultPrice'];
      this.language = data['language'];
      this.mark = data['mark'];  
      this.description = data['description'];
      this.login = data['login'];
      this.photoRef = data['photoRef'];
    }



}



@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {  
  teachersList : ITeacherInfo[] = [];

  @Input() data:any;
  
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
   // console.log( history.state.totalCount);
   let d : TeacherInfo[] = [];

    history.state.teachersDescriptions
      .forEach((teacher: any) => {
        d.push(new TeacherInfo(teacher))
      })
      this.teachersList = d;
  }

  addToBlackList(teacherId : number) {
    this.studentService
      .addToBlackList(teacherId)
      .subscribe((response :any) => {
        if (response.status === 200) {
          alert("teacher is added to black list")
        } else {
          alert("error")
        }
      });
  }

}
