import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";
import {AppSettings} from '../../components/httpconfig/httpconfig';
/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {

  constructor(public http: HttpClient,public storage: Storage) {
  }

  checkemail(email):Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.get(AppSettings.API_ENDPOINT+'checkemail/' + email,{headers: headers});
  }


  updateprofile(user, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'user/update', user,{headers: headers});
  }

  selectUserProfilePic(file: File, userId, token):Observable<any>  {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('userId', userId);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'user/userprofile', formdata, {headers: headers});
  }

  selectUserBackgroundPic(file: File, userId, token):Observable<any>  {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('userId', userId);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'user/userbackground', formdata, {headers: headers});
  }

  uploadusersignature(formdata: any, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'user/usersignature', formdata, {headers: headers});
  }

  getemail() {
    return this.storage.get('email');
  }

}
