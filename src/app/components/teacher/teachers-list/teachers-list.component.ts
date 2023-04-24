import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  @Input() data:any;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
    console.log( history.state['totalCount']);

  }

}
