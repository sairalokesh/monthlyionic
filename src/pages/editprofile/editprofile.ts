import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {MenuProvider} from "../../providers/menu/menu";
import {Storage} from "@ionic/storage";
import {SignaturePad} from 'angular2-signaturepad/signature-pad';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  loginuser:any={};
  passworduser:any={};
  selectedFiles: FileList;
  currentFileUpload: File;
  passwordsubmit:any = false;

  @ViewChild('profilepic') public profilepicvariable: any;
  @ViewChild('backgroundpic') public backgroundpicvariable: any;
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'penColor': 'rgb(66, 133, 244)',
    'backgroundColor': 'rgb(255,255,255)',
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  errorMessage: any = '';
  successMessage: any = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private menuProvider: MenuProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.passwordsubmit = false;
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
            this.passworduser = data;
          }
        },
        err => {

        });
    });
  }

  updateprofile(user){
    let loading = this.loadingCtrl.create({
      content: 'Updating...',
    });
    loading.present();
    this.storage.get('token').then(token=> {
      var token = token;
      this.menuProvider.updateprofile(user,token).subscribe(
        data => {
          loading.dismiss();
          if (data) {
            this.getUserDetails();
            let toast = this.toastCtrl.create({
              message: 'User Profile is updated!',
              duration: 1000,
              position: 'middle'
            });

            toast.present();
          }
        },
        err => {
          loading.dismiss();
        });
    });
  }


validatePassword(newPassword,confirmPassword){
    if(newPassword==undefined || newPassword==null || newPassword=='' || confirmPassword==undefined || confirmPassword==null || confirmPassword==''){
      this.passwordsubmit = false;
    }else{
      if(newPassword==confirmPassword){
        this.passwordsubmit = true;
      }else{
        this.passwordsubmit = false;
      }
    }
}

  updatepassword(user){
    let loading = this.loadingCtrl.create({
      content: 'Updating...',
    });
    loading.present();
    this.storage.get('token').then(token=> {
      var token = token;
      this.menuProvider.updateprofile(user,token).subscribe(
        data => {
          loading.dismiss();
          if (data) {
            let toast = this.toastCtrl.create({
              message: 'User Password is updated!',
              duration: 1000,
              position: 'middle'
            });

            toast.onDidDismiss(() => {
              this.storage.remove('token');
              this.storage.remove('email');
              this.storage.remove('userprofile');
              this.navCtrl.setRoot('LoginPage');
            });

            toast.present();
          }
        },
        err => {
          loading.dismiss();

        });
    });
  }

  selectUserProfilePic(event, userId) {
    let loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    loading.present();
    this.storage.get('token').then(token=> {
      var token = token;
      this.selectedFiles = event.target.files;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.menuProvider.selectUserProfilePic(this.currentFileUpload, userId, token).subscribe(
        data => {
          loading.dismiss();
          if (data) {
            this.getUserDetails();
            this.profilepicvariable._value = "";
            let toast = this.toastCtrl.create({
              message: 'User Profile Pic is Uploaded!',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
          }
        },
        err => {
          loading.dismiss();
          console.log(err);;
        });
    });

  }

  selectUserBackgroundPic(event, userId) {
    let loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    loading.present();
    this.storage.get('token').then(token=> {
      var token = token;
      this.selectedFiles = event.target.files;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.menuProvider.selectUserBackgroundPic(this.currentFileUpload, userId, token).subscribe(
        data => {
          loading.dismiss();
          if (data) {
            this.getUserDetails();
            this.backgroundpicvariable._value = "";
            let toast = this.toastCtrl.create({
              message: 'User Background Pic is Uploaded!',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
          }
        },
        err => {
          loading.dismiss();
          console.log(err);;
        });
    });

  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.clear();
  }

  drawComplete() {
    let loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    loading.present();
    this.storage.get('loginuser').then(loginuser=> {
      var loginuser = loginuser;
      this.storage.get('token').then(token => {
        var token = token;
        const blob = this.dataURItoBlob(this.signaturePad.toDataURL('image/png', 0.5));
        this.errorMessage = '';
        this.successMessage = '';
        console.log(blob);
        const fd = new FormData(document.forms[0]);
        fd.append('file', blob, loginuser.firstName + '_' + loginuser.id + '.png');
        fd.append('userId', loginuser.id);
        this.menuProvider.uploadusersignature(fd, token).subscribe(
          data => {
            loading.dismiss();
            if (data) {
              this.drawClear();
              let toast = this.toastCtrl.create({
                message: 'User Signature is Uploaded!',
                duration: 2000,
                position: 'middle'
              });
              toast.present();
            } else {
              loading.dismiss();
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
            loading.dismiss();
            const error = err;
            this.successMessage = '';
            console.log(err);
            this.errorMessage = error.message;
            setTimeout(() => {
              this.successMessage = '';
              this.errorMessage = '';
            }, 2000);
          });
      });
    });

  }

  drawClear() {
    this.signaturePad.clear();
  }


  dataURItoBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = atob(dataURI.split(',')[1]);

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }


  backtoprevious(){
    this.navCtrl.setRoot("ProfilePage");
  }
}
