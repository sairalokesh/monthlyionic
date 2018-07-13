import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TransactionProvider} from "../../providers/transaction/transaction";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the MonthyearcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthyearcategory',
  templateUrl: 'monthyearcategory.html',
})
export class MonthyearcategoryPage {

  transactions: any = [];
  errorMessage: any = '';
  successMessage: any = '';
  category: any ='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public transactionProvider: TransactionProvider) {
  }

  ionViewDidLoad() {
    this.category = this.navParams.get('category');
    this.storage.get('loginuser').then(loginuser=>{
      var loginuser = loginuser;
      this.storage.get('token').then(token=>{
        var token = token;
        this.getAllTransactions(loginuser,token);
      });

    });
  }

  getAllTransactions(loginuser,token) {
    this.category = this.navParams.get('category');
    this.transactionProvider.getAllTransactionsByCategory(loginuser,this.category,token).subscribe(
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



getMothlyCategoryTransactions(monthyear){
  this.category = this.navParams.get('category');
    this.navCtrl.setRoot("ViewcategoryPage",{
      monthyear: monthyear,
      category: this.category
    });
  }

  backtoprevious(){
    this.navCtrl.setRoot("CategoriesPage");
  }

}
