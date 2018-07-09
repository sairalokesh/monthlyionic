import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {Storage} from "@ionic/storage";
import {TransactionProvider} from "../../providers/transaction/transaction";
import {MapsAPILoader} from "@agm/core";

/**
 * Generated class for the EditmonthlytransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editmonthlytransaction',
  templateUrl: 'editmonthlytransaction.html',
})
export class EditmonthlytransactionPage implements  OnInit {

  transaction: any = {};

  public zoom: any;

  public latitude: any;
  public longitude: any;
  errorMessage: any = '';
  successMessage: any = '';
  monthyear:any = '';

  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public categories: any = ['Agriculture', 'Apparels', 'Bills',
    'Clothes', 'Communications', 'CreditCards',
    'Culture', 'Education', 'Entertainment',
    'Food', 'Fruits', 'Fuel',
    'Gas', 'Gifts', 'Groceries',
    'Hospital', 'Loans', 'Meats',
    'Medicines', 'Milk', 'Pets',
    'Purchases', 'Rent', 'Salary',
    'Shopping', 'SocialLife', 'Sports',
    'Taxi', 'Toiletry', 'Transport', 'Vegetables'];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              public geolocation: Geolocation,
              public transactionProvider: TransactionProvider,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.transaction.type = "";
    this.transaction.category = "";
    this.monthyear = this.navParams.get('monthyear');
  }

  ionViewDidLoad() {
      this.storage.get('token').then(token => {
        var token = token;
        var transactionId = this.navParams.get('transactionId');
        this.transactionProvider.editMonthlyTransaction(transactionId, token).subscribe(
          data => {
            if (data) {
              this.transaction = data;
              this.latitude = data.latitude;
              this.longitude = data.longitude;
              this.getlocation(data.latitude,data.longitude,data.location);
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
  };

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      var nativeHomeInputBox = document.getElementById('location').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: [],
        componentRestrictions: {country: 'IN'}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 25;
          this.getlocation(this.latitude,this.longitude,place.name);

        });
      });
    });
  }

  getlocation(latitude,longitude,locationName){
    let latLng = new google.maps.LatLng(latitude,longitude);
    let mapOptions = {
      center: latLng,
      zoom: 25,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      map: this.map,
      icon: 'http://www.codeshare.co.uk/images/blue-pin.png',
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    var content = '<div id="iw-container">' +
      '<div class="iw-title">'+locationName+'</div>' +
      '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  updateTransaction(transaction: any) {
    let loading = this.loadingCtrl.create({
      content: 'Updating...',
    });
    loading.present();
    this.storage.get('loginuser').then(loginuser=> {
      var loginuser = loginuser;
      this.storage.get('token').then(token => {
        var token = token;
        transaction.user = loginuser;
        var address = document.getElementById('location').getElementsByTagName('input')[0].value;
        console.log(address);
        transaction.location = address;
        transaction.latitude = this.latitude;
        transaction.longitude = this.longitude;
        this.transactionProvider.saveTransaction(transaction, token).subscribe(
          data => {
            loading.dismiss();
            if (data) {
              let toast = this.toastCtrl.create({
                message: 'Transaction is Updated successfully!',
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
    });
  }

  backtoprevious(){
    this.monthyear = this.navParams.get('monthyear');
    this.navCtrl.setRoot("MonthlytransactionPage",{
      monthyear: this.monthyear
    });
  }
}
