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

  deleteMonthlyTransaction(transactionId, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(AppSettings.API_ENDPOINT+'transaction/deleteMobileMonthlyTransaction/'+ transactionId, {headers: headers});
  }

  editMonthlyTransaction(transactionId, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(AppSettings.API_ENDPOINT+'transaction/editMobileMonthlyTransaction/'+ transactionId, {headers: headers});
  }


  /* Category Tab Functionality Starts */
  getAllTransactionsByCategory(user, category, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getSelectedCategory/' + category, user, {headers: headers});
  }


  getMonthyearcategorytransactionsLineGraph(user, category, monthyear, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getMonthcategorytransactionsCount/' + category+'/'+monthyear, user, {headers: headers});
  }

  getCategoryTransactions(user, category, monthyear, token):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post(AppSettings.API_ENDPOINT+'statistic/getCategoryTransactions/' + category+'/'+monthyear, user, {headers: headers});
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
