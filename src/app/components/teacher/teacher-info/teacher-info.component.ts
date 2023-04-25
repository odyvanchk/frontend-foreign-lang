import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from '../../../service/TeacherService';
import { requiredFileType } from '../../../validators/validators';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {

  teacherInfoForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    experience: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.maxLength(1000)]),
    image: new FormControl(new File([],''), [Validators.required]),
    isNative: new FormControl(false),
    level: new FormControl('', Validators.required),
    defaultPrice: new FormControl(0, Validators.min(1)),
    languages: new FormControl()
  });

  constructor(private teacherService: TeacherService) { }

  public updateFile(event : any) {
    this.teacherInfoForm.controls['image'].setValue(event.target.files[0]);
  }

  public onSubmitForm() {
    this.teacherService
    .postInfo(this.teacherInfoForm)
    .subscribe((response :any) => {
      if (response.status === 200) {
        alert("saved")
      } else {
        alert("error")
      }
    });
  }


  ngOnInit(): void {
  }

}

