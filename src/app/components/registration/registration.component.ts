import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/AuthApiService';
import { passwordMatchingValidatior, userHasAtLeastOneRoleValidatior } from '../../validators/validators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4), 
                                  Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), 
                                    Validators.maxLength(20), Validators.pattern(/[a-zA-Z0-9]+/i)]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.pattern(/.+@.+\.[a-zA-Z0-9]+/i), Validators.required]),
    isTeacher: new FormControl('',),
    isStudent: new FormControl('', )
  },
    { validators: [ passwordMatchingValidatior, userHasAtLeastOneRoleValidatior ]}
  )


  constructor(private authApi: AuthApiService, private router: Router) { }
  
  ngOnInit(): void {
   
  }

  onSubmitForm(){
    this.authApi
    .registr(this.regForm)
    .subscribe({
      next: (res) => {
          alert("user is registered, please confirm email");
          this.router.navigate(['/login'])   
      },
      error: (response) => {
        console.log(response)
        if (response.status === 400){
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
