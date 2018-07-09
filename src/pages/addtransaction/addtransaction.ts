import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {IonicPage, LoadingController,ToastController, NavController, NavParams} from 'ionic-angular';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Storage} from "@ionic/storage";
import {TransactionProvider} from "../../providers/transaction/transaction";


/**
 * Generated class for the AddtransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtransaction',
  templateUrl: 'addtransaction.html',
})
export class AddtransactionPage implements  OnInit{

  transaction: any = {};

  public zoom: any;

  public latitude: any;
  public longitude: any;
  errorMessage: any = '';
  successMessage: any = '';

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
    this.loadMap();
    this.transaction.type = "";
    this.transaction.category = "";
  }

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

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude+" "+ position.coords.longitude);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 25,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  getlocation(latitude,longitude,loctionName){
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
      '<div class="iw-title">'+loctionName+'</div>' +
      '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  saveTransaction(transaction: any) {
    let loading = this.loadingCtrl.create({
      content: 'Saving...',
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
              this.transaction = {
                'type': '',
                'category': '',
                'description':'',
                'location':'',
                'dbTransactionDate':'',
                'amount':''
              };
              this.loadMap();
              let toast = this.toastCtrl.create({
                message: 'Transaction is saved successfully!',
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
}

