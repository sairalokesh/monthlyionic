import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Chart } from 'chart.js';
import {DashboradProvider} from "../../providers/dashborad/dashborad";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  loginuser: any;
  successMessage: any;
  errorMessage: any;
  transactions: any = [];

  yearlystatistic: any = {};
  monthlystatistic: any = {};
  weeklystatistic: any = {};
  todaystatistic: any = {};


  constructor(public navCtrl: NavController, public storage: Storage, public dashboradProvider: DashboradProvider ) {

  }

  ionViewDidLoad() {
    this.storage.get('loginuser').then(loginuser=>{
      var loginuser = loginuser;
      this.storage.get('token').then(token=>{
        var token = token;

        this.dashboradProvider.getYearly(loginuser,token).subscribe(
          data => {
            if (data) {
              this.yearlystatistic = data;
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

        this.dashboradProvider.getMonthly(loginuser,token).subscribe(
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

        this.dashboradProvider.getWeekly(loginuser,token).subscribe(
          data => {
            if (data) {
              this.weeklystatistic = data;
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

        this.dashboradProvider.getToday(loginuser,token).subscribe(
          data => {
            if (data) {
              this.todaystatistic = data;
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


        this.dashboradProvider.monthlyransactionsCount(loginuser,token).subscribe(
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

        this.dashboradProvider.yearlyTransactionsCount(loginuser,token).subscribe(
          data => {
            if (data) {
              this.barChart = new Chart(this.barCanvas.nativeElement, {
                type: 'bar',
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

        this.dashboradProvider.monthlyransactionsGraph(loginuser,token).subscribe(
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

        this.dashboradProvider.todayTransactions(loginuser,token).subscribe(
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

      });

    });





  }
}
