import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AppSettings} from '../../components/httpconfig/httpconfig';

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  checkemail(email):Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.get(AppSettings.API_ENDPOINT+'checkemail/' + email,{headers: headers});
  }

  userLogin(user):Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(AppSettings.API_ENDPOINT+'login', user,{headers: headers});
  }

  checkSocialEmail(user):Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(AppSettings.API_ENDPOINT+'checkSocialEmail', user,{headers: headers});
  }

  userSignup(user):Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(AppSettings.API_ENDPOINT+'registerUser', user,{headers: headers});
  }

  sendEmail(user: any) {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(AppSettings.API_ENDPOINT+'forgotpassword', user,{headers: headers});
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
