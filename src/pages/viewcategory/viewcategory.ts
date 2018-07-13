import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TransactionProvider} from "../../providers/transaction/transaction";
import { Chart } from 'chart.js';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ViewcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewcategory',
  templateUrl: 'viewcategory.html',
})
export class ViewcategoryPage {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  lineChart: any;
  category: any ='';
  successMessage: any;
  errorMessage: any;
  transactions:any = [];
  monthyear: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private mapsAPILoader: MapsAPILoader, public geolocation: Geolocation, public transactionProvider: TransactionProvider, public storage: Storage, private ngZone: NgZone) {
     this.category = this.navParams.get('category');
    this.monthyear = this.navParams.get('monthyear');
  }

  ionViewDidLoad() {
    this.storage.get('loginuser').then(loginuser=> {
      var loginuser = loginuser;
      this.storage.get('token').then(token => {
        var token = token;
        this.category = this.navParams.get('category');
        this.monthyear = this.navParams.get('monthyear');
        this.transactionProvider.getMonthyearcategorytransactionsLineGraph(loginuser, this.category, this.monthyear, token).subscribe(
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

        this.transactionProvider.getCategoryTransactions(loginuser, this.category, this.monthyear, token).subscribe(
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
            '<div class="iw-title">'+transactions[i].location+'</div>' +
            '</div>';
          let infoWindow = new google.maps.InfoWindow({
            content: content
          });

          google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
          });

        };

      });

    });
  }

  backtoprevious(){
    this.category = this.navParams.get('category');
    this.navCtrl.setRoot("MonthyearcategoryPage",{
      category:  this.category
    });
  }

}
