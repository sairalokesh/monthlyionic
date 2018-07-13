import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TransactionProvider} from "../../providers/transaction/transaction";
import {Storage} from "@ionic/storage";
import { Chart } from 'chart.js';

/**
 * Generated class for the RangetransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rangetransaction',
  templateUrl: 'rangetransaction.html',
})
export class RangetransactionPage {

  searchtransaction : any = {};
  errorMessage: any = '';
  successMessage: any = '';
  monthlystatistic : any = {};
  transactions : any = [];

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  doughnutChart: any;
  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public transactionProvider: TransactionProvider) {
  }

  ionViewDidLoad() {
    this.storage.get('loginuser').then(loginuser=>{
      var loginuser = loginuser;
      this.storage.get('token').then(token=>{
        var token = token;
        this.transactionProvider.getMobileCurrentMonthlyMinMaxDates(loginuser, token).subscribe(
          data => {
            if (data) {
              const statics = data;
              this.searchtransaction = statics;
              this.getSelectedTransactions(statics,loginuser,token);
              this.getRangeTransactions(statics,loginuser,token);
              this.getRangetransactionsCount(statics,loginuser,token);
              this.getRangeTransactionsGraph(statics,loginuser,token);
            } else {
              const error = data;
              this.successMessage = '';
              this.errorMessage = error.message;
              setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
              }, 2000);
            }
          },
          err => {
            const error = err;
            this.successMessage = '';
            this.errorMessage = error.message;
            setTimeout(() => {
              this.successMessage = '';
              this.errorMessage = '';
            }, 2000);
          });
      });
    });
  }

  searchTransaction(statics: any) {
    this.storage.get('loginuser').then(loginuser=> {
      var loginuser = loginuser;
      this.storage.get('token').then(token => {
        var token = token;
        this.searchtransaction = statics;
        this.getSelectedTransactions(statics,loginuser,token);
        this.getRangeTransactions(statics,loginuser,token);
        this.getRangetransactionsCount(statics,loginuser,token);
        this.getRangeTransactionsGraph(statics,loginuser,token);
      });
    });
  }

  getSelectedTransactions(statics,loginuser,token) {
    statics.user = loginuser;
    this.transactionProvider.getSelectedTransactions(statics,token).subscribe(
      data => {
        if (data) {
          this.monthlystatistic = data;
        } else {
          const error = data;
          this.successMessage = '';
          this.errorMessage = error.message;
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
          }, 2000);
        }

      },
      err => {
        const error = err;
        this.successMessage = '';
        this.errorMessage = error.message;
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 2000);
      });
  }


  getRangeTransactions(statics,loginuser,token) {
    statics.user = loginuser;
    this.transactionProvider.getRangeTransactions(statics,token).subscribe(
      data => {
        if (data) {
          this.transactions = data;
        } else {
          const error = data;
          this.successMessage = '';
          this.errorMessage = error.message;
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
          }, 2000);
        }

      },
      err => {
        const error = err;
        this.successMessage = '';
        this.errorMessage = error.message;
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 2000);
      });
  }

  getRangetransactionsCount(statics,loginuser,token) {
    statics.user = loginuser;
    this.transactionProvider.getRangetransactionsCount(statics,token).subscribe(
      data => {
        if (data) {
          this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: data.monthYear,
              datasets: data.dataDTO
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero:true
                  }
                }]
              }
            }
          });

        } else {
          const error = data.json();
          this.successMessage = '';
          this.errorMessage = error.message;
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
          }, 2000);
        }

      },
      err => {
        const error = err.json();
        this.successMessage = '';
        this.errorMessage = error.message;
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 2000);
      });
  }


  getRangeTransactionsGraph(statics,loginuser,token) {
    statics.user = loginuser;
    this.transactionProvider.getRangeTransactionsGraph(statics, token).subscribe(
      data => {
        if (data) {
          this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
              labels: data.labels,
              datasets: [{
                data: data.data,
                backgroundColor: data.color,
                hoverBackgroundColor: data.color
              }]
            }

          });
        } else {
          const error = data;
          this.successMessage = '';
          this.errorMessage = error.message;
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
          }, 2000);
        }

      },
      err => {
        const error = err;
        this.successMessage = '';
        this.errorMessage = error.message;
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 2000);
      });
  }
}
