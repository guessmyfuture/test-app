import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueInitiatedPage } from './issue-initiated';

@NgModule({
  declarations: [
    IssueInitiatedPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueInitiatedPage),
  ],
})
export class IssueInitiatedPageModule {}
