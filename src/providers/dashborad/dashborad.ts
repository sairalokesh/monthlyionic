import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AppSettings} from '../../components/httpconfig/httpconfig';

@Injectable()
export class DashboradProvider {

  constructor(public http: HttpClient) {

  }

  getYearly(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getYearly', user, {headers: headers});
  }

  getMonthly(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthly', user, {headers: headers});
  }

  getWeekly(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getWeekly', user, {headers: headers});
  }

  getToday(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getToday', user, {headers: headers});
  }

  monthlyransactionsCount(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthlyTransaction', user, {headers: headers});
  }

  yearlyTransactionsCount(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getYearlyTransaction', user, {headers: headers});
  }

  monthlyransactionsGraph(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthlyChart', user, {headers: headers});
  }

  todayTransactions(user,token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getTodayTransactions', user, {headers: headers});
  }
}
