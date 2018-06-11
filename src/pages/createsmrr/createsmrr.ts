import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { DatePicker } from 'ionic2-date-picker';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-createsmrr',
  templateUrl: 'createsmrr.html',
  providers: [ DatePicker ]
})
export class CreatesmrrPage {

 smrr: string = "issue_header";
  _imageViewerCtrl: ImageViewerController;
 items;
 items1;
 cards = [];
 speechList: string;
 base64Image: string;
 image: string;
 iosOptions: {};
 text: string;
 date = null;
 date1 = null;
 date2 = null;
 plant = null;

 createSmrr = {
  dateInitiated: new Date(),
  plant: null,
  issueOrigin: null,
  severity: null,
  shift: null,
  sorting: null,
  mqr: null,
  defectType: null,
  required_4d: null,
  required_8d: null,
  due_date_4d: null,
  due_date_8d: null,
  moveParts: null,
  pONbr: null,
  partNbr: null
 }
 imageList = [];

 constructor(private platform: Platform, private imagePicker: ImagePicker, public imageViewerCtrl: ImageViewerController, public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private camera: Camera, private speech: SpeechRecognition, private geolocation: Geolocation, private tts: TextToSpeech, public datePicker: DatePicker, private modalCtrl: ModalController, private viewController: ViewController) {
  this.initializeItems();
  this.datePicker = new DatePicker( < any > this.modalCtrl, < any > this.viewController);
  this._imageViewerCtrl = imageViewerCtrl;
 }

 ionViewDidLoad() {
  console.log('ionViewDidLoad CreatesmrrPage');
  this.geolocation.getCurrentPosition().then((resp) => {
   console.log(resp.coords.latitude);
   console.log(resp.coords.longitude);
   let alert = this.alertCtrl.create({
    title: 'Confirm Plant',
    subTitle: 'Current Plant is set to <strong>JV-Chennai -ETJC </strong>. <br><br>Do you want to continue with this plant ?',
    buttons: [{
     text: 'No',
     handler: () => {
      this.plant = null;
     }
    }, {
     text: 'Yes',
     handler: () => {
      this.plant = 'JV-Chennai-ETJC';
      this.createSmrr.plant = 'JV-Chennai-ETJC';
     }
    }, ]
   });
   alert.present();

  }).catch((error) => {
   console.log('Error getting location', error);
   let toast = this.toastCtrl.create({
    message: 'Sorry! Not able to find your geolocation',
    duration: 5000,
    position: "top"
   });
   toast.present();
  });

 }

 async isSpeechSupported(): Promise < boolean > {
  let isAvailable = await this.speech.isRecognitionAvailable();
  console.log(isAvailable);
  return isAvailable;
 }

 async getPermission(): Promise < void > {
  try {
   let permission = await this.speech.requestPermission();
   console.log(permission);
   return permission;
  } catch (e) {
   console.error(e);
  }
 }

 async hasPermission(): Promise < boolean > {
  try {
   let permission = await this.speech.hasPermission();
   console.log(permission);
   return permission;
  } catch (e) {
   console.error(e);
  }
 }

 async getSupportedLanguages(): Promise < Array < string >> {
  try {
   let languages = await this.speech.getSupportedLanguages();
   console.log(languages);
   return languages;
  } catch (e) {
   console.error(e);
  }
 }

 listenForSpeech(): void {
  this.isSpeechSupported();
  this.getPermission();
  this.hasPermission();
  this.getSupportedLanguages();

  this.iosOptions = {
   language: 'en-US'
  }

  if (this.platform.is('android')) {
   this.speech.startListening().subscribe(data => this.ivr(data), error => console.log(error));
  } else if (this.platform.is('ios')) {
   this.speech.startListening().subscribe(data => this.speechList = data[0], error => console.log(error));
  }
 }

 ivr(data) {
  this.speechList = data[0];
  this.tts.speak('Have u said ' + this.speechList)
   .then(() => console.log(this.speechList))
   .catch((reason: any) => console.log(reason));
 }

 scan() {
  this.barcodeScanner.scan().then((barcodeData) => {
   console.log(barcodeData);
   var barcode = barcodeData.text;
   var bCode = barcode.split('&');
   this.createSmrr.partNbr = bCode[2];
   this.createSmrr.pONbr = bCode[0];

   let alert = this.alertCtrl.create({
    title: 'Scan Success',
    subTitle: '<br> Part Number and is <strong> ' + this.createSmrr.partNbr + '</strong> <br> PO Number is <strong> ' + this.createSmrr.pONbr + '</strong>',
    buttons: [{
     text: 'Ok',
    }]
   });

   alert.present();

  }, (err) => {
   let toast = this.toastCtrl.create({
    message: 'There is an error with scanner',
    duration: 5000,
    position: "top"
   });
   toast.present();
  });

 }

 initializeItems() {
  this.items = [{
   name: 'Muralidharan',
   phone_nbr: '+1 616 16767',
   title: 'MS',
   email: 'cselvamu@adient.com'
  }, {
   name: 'Sundar Ethiraj',
   phone_nbr: '+1 616 123767',
   title: 'QE',
   email: 'aethras@adient.com'
  }, {
   name: 'Senthil Kumar',
   phone_nbr: '+1 616 121267',
   title: 'MS',
   email: 'atse@adient.com'
  }, {
   name: 'Ramakrishna Adibatla',
   phone_nbr: '+1 616 11230963',
   title: 'SQE',
   email: 'aramaka2@adient.com'
  }];
 }

 getItems(ev) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the ev target
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
   this.items1 = this.items.filter((item) => {
    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
   })
  }
 }

 showCard(item) {
  this.items1 = [];
  this.cards.push(item);
 }

 takePicture(type) {
  this.showActionSheet(type);
 }

 public showActionSheet(type) {
  let actionSheet = this.actionSheetCtrl.create({
   title: 'Choose the source type',
   buttons: [{
    icon: 'camera',
    text: 'Camera',
    handler: () => {
     this.loadImage(this.camera.PictureSourceType.CAMERA, type);
    }
   }, {
    icon: 'image',
    text: 'Gallery',
    handler: () => {
     this.loadImage(this.camera.PictureSourceType.PHOTOLIBRARY, type);
    }
   }, {
    text: 'Cancel',
    role: 'cancel'
   }]
  });
  actionSheet.present();
 }

 private loadImage(selectedSourceType, type) {
  let cameraOptions: CameraOptions = {
   sourceType: selectedSourceType,
   destinationType: this.camera.DestinationType.FILE_URI,
   quality: 100,
   allowEdit : true,
   encodingType: this.camera.EncodingType.JPEG,
   mediaType: this.camera.MediaType.PICTURE,
   correctOrientation: true,
  }
   if (type === 'single') {
  this.camera.getPicture({
   destinationType: this.camera.DestinationType.FILE_URI,
   sourceType: this.camera.PictureSourceType.CAMERA,
  }).then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;

  }, (err) => {
   console.log(err);
  });
  }else{
   this.imagePicker.requestReadPermission();
  this.imagePicker.getPictures(cameraOptions).then((results) => {
    for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.image = "data:image/jpeg;base64," + results[i];
                this.imageList.push(this.image);
    }
  });
 }
}


 showCalendar() {
  var d2 = this.date2;
  var d1 = this.date1;
  this.datePicker.showCalendar();
  this.datePicker.onDateSelected.subscribe((date) => {
   console.log(date);
   this.date1 = d1;
   this.date2 = d2;
   this.date = new Date(date);
  });
 }

 showCalendar1() {
  var d = this.date;
  var d2 = this.date2;
  this.datePicker.showCalendar();
  this.datePicker.onDateSelected.subscribe((date) => {
   console.log(date);
   this.date = d;
   this.date2 = d2;
   this.date1 = new Date(date);
  });

 }

 showCalendar2() {
  var d = this.date;
  var d1 = this.date1;

  this.datePicker.showCalendar();
  this.datePicker.onDateSelected.subscribe((date) => {
   console.log(date);
   this.date1 = d1;
   this.date = d;
   this.date2 = new Date(date);
  });

 }

 presentAlert() {
  let alert = this.alertCtrl.create({
   title: 'Success',
   subTitle: '<br>Issue has been created successfully :<br><strong>IRIS-SMRR-17000010<strong>',
   buttons: [{
    text: 'Ok',
   }]
  });
  alert.present();
 }

 presentAlert2() {
  let alert = this.alertCtrl.create({
   title: 'Saved ',
   subTitle: '<br>Issue has been saved successfully :<br><strong>IRIS-SMRR-17000010<strong>',
   buttons: ['Ok']
  });
  alert.present();
 }
}
