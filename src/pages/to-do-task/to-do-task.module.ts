import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToDoTaskPage } from './to-do-task';

@NgModule({
  declarations: [
    ToDoTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(ToDoTaskPage),
  ],
})
export class ToDoTaskPageModule {}
