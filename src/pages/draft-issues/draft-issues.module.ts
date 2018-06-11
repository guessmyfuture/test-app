import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DraftIssuesPage } from './draft-issues';

@NgModule({
  declarations: [
    DraftIssuesPage,
  ],
  imports: [
    IonicPageModule.forChild(DraftIssuesPage),
  ],
})
export class DraftIssuesPageModule {}
