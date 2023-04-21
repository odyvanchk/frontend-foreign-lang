import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.pattern(/.+@.+\.[a-zA-Z0-9]+/i), Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  
  constructor(private authApi: AuthApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm(){ 
    this.authApi
    .login(this.loginForm)
    .subscribe({
      next: (res) => {
          const cookies = new Cookies();
          cookies.set('access', res.access, { path: '/', expires:new Date (Number(res.expTime)) });
          this.router.navigate(['/hello'])
          alert("user logged in")
      },
      error: (response) => {
        if (response.status === 400|| response.status === 401 || response.status === 404){
         Object.values( response.error.errors).map((message) => {
               alert(message);
           });        
      }
      if (response.status >= 500) {
         alert("something happened on the server")
        }      
      }
    })
  }
}
