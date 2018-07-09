import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../components/httpconfig/httpconfig';
import {Observable} from "rxjs/Observable";

@Injectable()
export class TransactionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TransactionProvider Provider');
  }

  getAllTransactions(user, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'transaction/transactions', user, {headers: headers});
  }

  saveTransaction(transaction, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'transaction/mobilecreate', transaction, {headers: headers});
  }


  getMonthlytransactionsCount(user, monthyear, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthlytransactionsCount/' + monthyear, user, {headers: headers});
  }

  getmonthlyransactionsGraph(user, monthyear, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getmonthlyransactionsGraph/' + monthyear, user, {headers: headers});
  }

  getMonthlyTransactions(user, monthyear, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthlyTransactions/' + monthyear, user, {headers: headers});
  }

  editMonthlyTransaction(transactionId, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(AppSettings.API_ENDPOINT+'transaction/editMobileMonthlyTransaction/'+ transactionId, {headers: headers});
  }

  deleteMonthlyTransaction(transactionId, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(AppSettings.API_ENDPOINT+'transaction/deleteMobileMonthlyTransaction/'+ transactionId, {headers: headers});
  }

  getMonthyearcategorytransactionsCount(user, category, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthyearcategorytransactionsCount/' + category, user, {headers: headers});
  }

  getyearcategorytransactionsCount(user, category, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getyearcategorytransactionsCount/' + category, user, {headers: headers});
  }

  getCategoryTransactions(user, category, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getCategoryTransactions/' + category, user, {headers: headers});
  }

  getMobileCurrentMonthlyMinMaxDates(user, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMobileCurrentMonthlyMinMaxDates', user, {headers: headers});
  }

  getSelectedTransactions(transaction, token):Observable<any>  {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMobileSelectedTransactions', transaction, {headers: headers});
  }

  getRangeTransactions(transaction, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMobileRangeTransactions', transaction, {headers: headers});
  }

  getRangetransactionsCount(transaction, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMobileRangetransactionsCount', transaction, {headers: headers});
  }

  getRangeTransactionsGraph(transaction, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMobileRangeTransactionsGraph', transaction, {headers: headers});
  }






}
