import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TransactionProvider} from "../../providers/transaction/transaction";

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  transactions: any = [];
  errorMessage: any = '';
  successMessage: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public transactionProvider: TransactionProvider) {
  }

  ionViewDidLoad() {
    this.storage.get('loginuser').then(loginuser=>{
      var loginuser = loginuser;
      this.storage.get('token').then(token=>{
        var token = token;
        this.getAllTransactions(loginuser,token);
      });

    });
  }

  getAllTransactions(loginuser,token) {
    this.transactionProvider.getAllTransactions(loginuser,token).subscribe(
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

  addnewtransaction(){
    this.navCtrl.setRoot("AddtransactionPage");
  }

  getMothlyTransactions(monthyear){
    this.navCtrl.setRoot("MonthlytransactionPage",{
      monthyear: monthyear
    });
  }

}
