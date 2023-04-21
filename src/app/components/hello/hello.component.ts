import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from '../../service/AuthApiService';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  ngOnInit(): void {
    
  }
  helloRole = (event : any) => {
    event.preventDefault();
    let prom;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    // eslint-disable-next-line default-case
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
      //if (res.status === 200){
        alert(res.txt)
   //  }    
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
