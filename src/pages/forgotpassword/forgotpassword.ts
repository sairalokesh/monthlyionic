import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {AppSettings} from "../../components/httpconfig/httpconfig";

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  errorMessage: any = '';
  successMessage: any = '';
  user: any = {};
  login: any = {};
  emailuser: any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams,private service: LoginProvider) {
    this.service.logout();
    this.emailuser.userProfileName = 'assets/imgs/user.png';
    this.emailuser.backgroundImageName = 'assets/imgs/bg.jpg';
  }

  sendEmail(user: any) {
    this.errorMessage = '';
    this.successMessage = '';
    this.service.sendEmail(user).subscribe(
      data => {
        if (data) {
          this.errorMessage = '';
          this.successMessage = 'Email is sent to Register email id';
        } else {
          this.successMessage = '';
          this.errorMessage = 'Email is not register! Please signup first!';
        }
      },
      err => {
        this.successMessage = '';
        this.errorMessage = 'Email is not register! Please signup first!';
      });
  }

  emailcheck(email) {
    this.service.checkemail(email).subscribe(
      data => {
        if (data) {
          this.emailuser = data;
          if (data.backgroundImageName != "" && data.backgroundImageName!=null) {
            this.emailuser.backgroundImageName = AppSettings.API_ENDPOINT+'userprofile/' + data.backgroundImageName;
          } else {
            this.emailuser.backgroundImageName = 'assets/imgs/bg.jpg';
          }
          if (data.userProfileName == "" || data.userProfileName==null) {
            this.emailuser.userProfileName = 'assets/imgs/user.png';
          }else{
            this.emailuser.userProfileName = AppSettings.API_ENDPOINT+'userprofile/' + data.userProfileName;
          }
        } else {
          this.emailuser.userProfileName = 'assets/imgs/user.png';
          this.emailuser.backgroundImageName = 'assets/imgs/bg.jpg';
        }
      },
      err => {
        this.emailuser.userProfileName = 'assets/imgs/user.png';
        this.emailuser.backgroundImageName = 'assets/imgs/bg.jpg';
      });
  }

  LoginPage(){
    this.navCtrl.setRoot("LoginPage");
  }

}
