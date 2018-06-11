import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-issue-initiated',
  templateUrl: 'issue-initiated.html',
})
export class IssueInitiatedPage {
showDesc:boolean = false;
  _imageViewerCtrl: ImageViewerController;


  constructor(public navCtrl: NavController, public navParams: NavParams,public imageViewerCtrl: ImageViewerController) {
  this._imageViewerCtrl = imageViewerCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueInitiatedPage');
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
      const imageViewer = this._imageViewerCtrl.create(myImage);
      imageViewer.present();
    }
}
