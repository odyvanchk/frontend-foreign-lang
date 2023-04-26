import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from '../service/TeacherService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  searchCriteria = new FormGroup({
    country: new FormControl(null),
    experienceFrom: new FormControl(null),
    experienceTo: new FormControl(null),
    isNative: new FormControl(null),
    levelFrom: new FormControl(null),
    defaultPriceFrom: new FormControl(null),
    defaultPriceTo: new FormControl(null),
    language: new FormControl(null),
    markFrom:new FormControl(null),
    markTo:new FormControl(null)
  });

  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmitForm() {
    let criteria = this.getCriteria();
    this.teacherService
    .search(criteria)
    .subscribe({
      next: (res) => {
        alert("saved")
        res.searchCriteria = criteria;
        this.router.navigate(['/teachers'], {state: res})
    },
    error: (res) => {
        alert("error")
    }
  });
  }

  getCriteria() : any {
    return Object.fromEntries(Object.entries(this.searchCriteria.value)
  .filter(([_, v]) => v != null));
  }

}
