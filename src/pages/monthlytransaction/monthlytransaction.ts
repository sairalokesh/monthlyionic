import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { IonicPage, LoadingController,ToastController,NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TransactionProvider} from "../../providers/transaction/transaction";
import { Chart } from 'chart.js';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MonthlytransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthlytransaction',
  templateUrl: 'monthlytransaction.html',
})
export class MonthlytransactionPage {


  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  doughnutChart: any;
  lineChart: any;
  successMessage: any;
  errorMessage: any;
  transactions: any = [];
  monthyear: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private mapsAPILoader: MapsAPILoader, public storage: Storage,
              public transactionProvider: TransactionProvider, private ngZone: NgZone,
              public geolocation: Geolocation, private alertCtrl: AlertController,
              private toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad() {
    this.getMonthlyTransactions();
  }

  getMonthlyTransactions(){
    this.storage.get('loginuser').then(loginuser=>{
      var loginuser = loginuser;
      this.storage.get('token').then(token=>{
        var token = token;
        this.monthyear = this.navParams.get('monthyear');
        this.transactionProvider.getMonthlytransactionsCount(loginuser, this.monthyear, token).subscribe(
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

        this.transactionProvider.getmonthlyransactionsGraph(loginuser, this.monthyear, token).subscribe(
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

        this.transactionProvider.getMonthlyTransactions(loginuser, this.monthyear, token).subscribe(
          data => {
            if (data) {
              this.transactions = data;
              this.getlocation(this.transactions);
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

  getlocation(transactions){
    this.mapsAPILoader.load().then(() => {
      this.ngZone.run(() => {
        let latLng = new google.maps.LatLng(transactions[0].latitude,transactions[0].longitude);
        let mapOptions = {
          center: latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        for(var i = 0; i <transactions.length; i++){
          console.log(transactions[i].latitude+" "+transactions[i].longitude);
          var amount = 0;
          if(transactions[i].creditAmount>0){
            amount = transactions[i].creditAmount;
          }else{
            amount = transactions[i].debitAmount;
          }

          let marker = new google.maps.Marker({
            map: this.map,
            icon: 'http://www.codeshare.co.uk/images/blue-pin.png',
            animation: google.maps.Animation.DROP,
            position: {
              lat: transactions[i].latitude,
              lng: transactions[i].longitude
            },
          });

          var content = '<div id="iw-container">' +
            '<div class="iw-title">'+transactions[i].category+'</div>' +
            '<div class="iw-content">' +
            '<p><span style="color: #48b5e9;">Location : </span><br/><span class="col-6">'+transactions[i].location+'</span><br/><span style="color: #48b5e9;">Date : </span><br/><span>'+new Date(transactions[i].transactionDate)+'</span><br>'+
            '<span style="color: #48b5e9;">Amount : </span><br/><span>' +amount+'</span></p>'+
            '</div>' +
            '</div>';
          let infoWindow = new google.maps.InfoWindow({
            content: content,
            maxWidth: 350
          });

          google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
          });

          google.maps.event.addListener(this.map, 'click', function() {
            infoWindow.close();
          });




      };

    });

    });

  }

  editTransaction(transactionId) {
    this.monthyear = this.navParams.get('monthyear');
    this.navCtrl.setRoot("EditmonthlytransactionPage",{
      transactionId: transactionId,
      monthyear: this.monthyear
    });
  }

  deleteTransaction(transactionId) {
    let alert = this.alertCtrl.create({
      title: 'Delete Confirmation',
      message: 'Do you want to delete this transaction?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('CANCEL clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting...',
            });
            loading.present();
            this.storage.get('token').then(token=> {
              var token = token;
              this.transactionProvider.deleteMonthlyTransaction(transactionId, token).subscribe(
                data => {
                  loading.dismiss();
                  if (data) {
                    this.getMonthlyTransactions();
                    let toast = this.toastCtrl.create({
                      message: 'Transaction is deleted successfully!',
                      duration: 3000,
                      position: 'middle'
                    });

                    toast.present();
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

          }
        }
      ]
    });
    alert.present();
  }


  addnewtransaction(){
    this.monthyear = this.navParams.get('monthyear');
    this.navCtrl.setRoot("AddmonthlytransactionPage",{
      monthyear: this.monthyear
    });
  }

  backtoprevious(){
    this.navCtrl.setRoot("TransactionsPage");
  }
}
