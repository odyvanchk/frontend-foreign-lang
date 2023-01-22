import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { BASE_URL, USER_URL } from "../env";
import Cookies from "universal-cookie";
import FingerprintJS from '@fingerprintjs/fingerprintjs'


@Injectable()
export class AuthApiService {
    visitorId : string ='';
  
    constructor(private http: HttpClient) {
    const fpPromise = FingerprintJS.load();
    (async () => {
      const fp = await fpPromise
      const result = await fp.get()
      this.visitorId = result.visitorId;
    })()
   }

     

  registr(regForm: FormGroup) : Observable<any> {
    let user = JSON.stringify(regForm.getRawValue())
    const cookie = new Cookies();
    cookie.remove('access')
    return this.http
      .post(`${BASE_URL}${USER_URL}/registration`, user)

  }


  login(loginForm: FormGroup ): Observable<any> {
    let user = loginForm.getRawValue()
    user.fingerprint = this.visitorId;
    console.log(this.visitorId)

    const cookie = new Cookies();
    cookie.remove('access')

    return this.http
      .post(`${BASE_URL}${USER_URL}/auth`, user, { withCredentials: true })

  }

  updateFromRefresh() : Observable<any>{
    const cookies = new Cookies();
    const jwtToken = cookies.get('refresh'); 
    let resp = {"fingerprint" : this.visitorId}
    return this.http.post(`${BASE_URL}${USER_URL}/auth/refresh`, resp, { withCredentials: true })
}

 

  helloStudent() {
    return this.http.get(`${BASE_URL}${USER_URL}/lessons/student`, {withCredentials : true})
}

  helloTeacher() {
    return this.http.get(`${BASE_URL}${USER_URL}/lessons/teacher`, {withCredentials : true})
}

}