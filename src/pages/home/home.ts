import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

splash = true;

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {

  }

openSearch(){
this.iab.create('https://irissearch.adient.com/IRISSearch/AE');
//browser.close();
}

ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

openUtilities(){
  this.iab.create('https://ag.adient.com/IRISUtilities/#!/userAccountTool/AE');
}
  navigateTo(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.navCtrl.push(page);
    }

}
