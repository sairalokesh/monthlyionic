import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditprofilePage } from './editprofile';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    EditprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditprofilePage),
    SignaturePadModule
  ],
})
export class EditprofilePageModule {}
