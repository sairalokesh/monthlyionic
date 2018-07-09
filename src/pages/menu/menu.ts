import {Component, ViewChild, OnInit} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;

}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  rootPage = 'DashboardPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {title: 'Dashboard', pageName: 'DashboardPage', icon: 'home'},
    {title: 'Transactions', pageName: 'TransactionsPage', icon: 'cash'},
    {title: 'Categories', pageName: 'CategoriesPage', icon: 'apps'},
    {title: 'Range Transactions', pageName: 'RangetransactionPage', icon: 'cash'},
    {title: 'Profile', pageName: 'ProfilePage', icon: 'person'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewWillEnter() {

  }


  ngOnInit(){

  }

  openPage(page: PageInterface){
    this.nav.setRoot(page.pageName);
  }

  isActive(page: PageInterface){

  }

  logout(){
    this.storage.remove('token');
    this.storage.remove('email');
    this.storage.remove('userprofile');
    this.nav.setRoot('LoginPage');
  }

}
