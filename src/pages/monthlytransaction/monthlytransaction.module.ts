import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlytransactionPage } from './monthlytransaction';

@NgModule({
  declarations: [
    MonthlytransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthlytransactionPage),
  ],
})
export class MonthlytransactionPageModule {}
