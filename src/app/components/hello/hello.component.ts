import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from '../../service/AuthApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  constructor(private authApi: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    
  }
  helloRole = (event : any) => {
    event.preventDefault();
    let prom;
    var target = event.target || event.srcElement || event.currentTarget;
    var value = target.textContent;
    switch(value){
        case "student":
            prom = this.authApi.helloStudent.bind(this.authApi);
            break;
        case "teacher":
        default:
            prom = this.authApi.helloTeacher.bind(this.authApi);
            break;
    }
    prom()
.subscribe({
    next: (res:any) => {
        alert(res.txt)
        this.router.navigate([`/teachers/${1}/schedule/book`])
    },
    error: (error) => {
      if (error.status === 401  || error.status === 404 || error.status === 400){
        if (error.error.errors){
        Object.values(error.error.errors).map((message) => {
            console.log(message);
        });   
    }
        alert("user nedd to login. errors might be in console")
    }  
    if( error.status === 403) {
        alert("not enough access rights")
    }
    if (error.status >= 500){
       alert("something happened on the server")
    }    
    }
  });

}
}
