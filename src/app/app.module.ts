import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginProvider } from '../providers/login/login';

import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { MenuProvider } from '../providers/menu/menu';
import { ProfileProvider } from '../providers/profile/profile';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import {ChartModule} from 'angular2-chartjs';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {SignaturePadModule} from 'angular2-signaturepad';
import { DashboradProvider } from '../providers/dashborad/dashborad';
import { TransactionProvider } from '../providers/transaction/transaction';
import {AgmCoreModule} from '@agm/core';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    SignaturePadModule,
    ChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjUHpiDhHJwK0vCMayeOTvEB08RXI1YCg',
      libraries: ['places']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    LoginProvider,
    AuthProvider,
    Facebook,
    GooglePlus,
    MenuProvider,
    ProfileProvider,
    DashboradProvider,
    TransactionProvider,
    Geolocation

  ]
})
export class AppModule {}
