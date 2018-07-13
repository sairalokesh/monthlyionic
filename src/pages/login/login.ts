import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginProvider} from '../../providers/login/login';
import {AppSettings} from '../../components/httpconfig/httpconfig';

import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  errorMessage: any = '';
  successMessage: any = '';
  user: any = {};
  login: any = {};
  emailuser: any = {};
  jwtHelper = new JwtHelper();


  constructor(public navCtrl: NavController, public navParams: NavParams, private service: LoginProvider, private storage: Storage, public fb: Facebook, private googlePlus: GooglePlus) {
    this.service.logout();
    this.emailuser.userProfileName = 'assets/imgs/user.png';
    this.emailuser.backgroundImageName = 'assets/imgs/bg.jpg';
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

  userLogin(user: any) {
    this.errorMessage = '';
    this.successMessage = '';
    this.service.userLogin(user).subscribe(
      data => {
        if (data.token) {
          if (data && data.token) {
            this.authSuccess(data);
            this.navCtrl.setRoot("MenuPage");
          }

        } else {
          this.successMessage = '';
          this.errorMessage = 'Please Enter valid email & Password';
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
          }, 2000);
        }

      },
      err => {
        this.successMessage = '';
        this.errorMessage = "Please enter valid email & password";
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 2000);
      });
  }

  signInWithFB(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then((res: FacebookLoginResponse) => {
        if (res.status == "connected") {
          this.fb.api("/me?fields=first_name,last_name,email", []).then((user) => {
            var userData = {firstName: '', lastName: '', email: ''};
            userData.firstName = user.first_name;
            userData.lastName = user.first_name;
            userData.email = user.email;
            this.service.checkSocialEmail(userData).subscribe(
              data => {
                if (data) {
                  const user = data;
                  this.userLogin(user);
                } else {
                  this.successMessage = '';
                  this.errorMessage = 'Something went to wrong! Please try again';
                }
              },
              err => {
                this.successMessage = '';
                this.errorMessage = err.message;
              });
          });

        }
        else {
          this.successMessage = '';
          this.errorMessage = 'Something went to wrong! Please try again';
        }

      })
      .catch((e) => {
        this.successMessage = '';
        this.errorMessage = 'Something went to wrong! Please try again';
      });
  }

  signInWithGoogle(): void {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        var userData = {firstName: '', lastName: '', email: ''};
        userData.firstName = res.givenName;
        userData.lastName = res.familyName;
        userData.email = res.email;
        this.service.checkSocialEmail(userData).subscribe(
          data => {
            if (data) {
              const user = data;
              this.userLogin(user);
            } else {
              this.successMessage = '';
              this.errorMessage = 'Something went to wrong! Please try again';
            }
          },
          err => {
            this.successMessage = '';
            this.errorMessage = err.message;
          });
      })
      .catch(err => {
        this.successMessage = '';
        this.errorMessage = 'Something went to wrong! Please try again';
      });
  }

  authSuccess(data) {
    this.storage.set('token', data.token);
    const email = this.jwtHelper.decodeToken(data.token).sub;
    this.storage.set('email', email);
    this.storage.set('loginuser', data.user);
  }

  signupPage() {
    this.navCtrl.setRoot("SignupPage");
  }

  forgotpasswordPage() {
    this.navCtrl.setRoot("ForgotpasswordPage");
  }

}
