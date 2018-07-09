import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuProvider} from "../../providers/menu/menu";
import {AppSettings} from "../../components/httpconfig/httpconfig";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage  implements OnInit {

  loginuser:any={};
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuProvider: MenuProvider) {
  }

  ngOnInit(){
    this.getUserDetails();
  }

  getUserDetails(){
    this.menuProvider.getemail().then(email =>{
      this.menuProvider.checkemail(email).subscribe(
        data => {
          if (data) {
            this.loginuser = data;
            if (data.backgroundImageName != "" && data.backgroundImageName != null) {
              this.loginuser.backgroundImageName =  AppSettings.API_ENDPOINT+'userprofile/' +  data.backgroundImageName;
            } else {
              this.loginuser.backgroundImageName = 'assets/imgs/bg.jpg';
            }
            if ( data.userProfileName == "" || data.userProfileName == null) {
              this.loginuser.userProfileName = 'assets/imgs/user.png';
            }else{
              this.loginuser.userProfileName =  AppSettings.API_ENDPOINT+'userprofile/' +  data.userProfileName;
            }
            if ( data.signatureName == "" || data.signatureName == null) {
              this.loginuser.signatureName = '';
            }else{
              this.loginuser.signatureName =  AppSettings.API_ENDPOINT+'userprofile/' +  data.signatureName;
            }
          }
        },
        err => {

        });
    });
  }

  edituser(){
    this.navCtrl.setRoot("EditprofilePage");
  }

}
