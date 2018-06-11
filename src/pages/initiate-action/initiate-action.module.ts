import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitiateActionPage } from './initiate-action';

@NgModule({
  declarations: [
    InitiateActionPage,
  ],
  imports: [
    IonicPageModule.forChild(InitiateActionPage),
  ],
})
export class InitiateActionPageModule {}
