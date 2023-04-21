import { Component, Input, OnInit, HostBinding } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  @Input() title: string ='';
  @Input() public isUserLoggedIn!: boolean;
  @Input() public role = "student";

  

  ngOnInit(): void {
    
  }

}
