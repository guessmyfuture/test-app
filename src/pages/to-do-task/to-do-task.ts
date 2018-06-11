import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-to-do-task',
  templateUrl: 'to-do-task.html',
})
export class ToDoTaskPage {

showDesc:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public imageViewerCtrl: ImageViewerController) {
  this.imageViewerCtrl = imageViewerCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToDoTaskPage');
  }

  sDesc(){
  if(this.showDesc){
  this.showDesc = false;
  }else{
  this.showDesc = true;
  }

  }

   presentImage(myImage) {
    console.log('in present method');
        const imageViewer = this.imageViewerCtrl.create(myImage);
        imageViewer.present();
      }

}
