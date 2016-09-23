import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Cordova} from '../../../node_modules/cordova-js/src/cordova';

// import { FIREBASE_PROVIDERS,
//     defaultFirebase,
//     AngularFire,
//     AuthMethods,
//     AuthProviders,
//     firebaseAuthConfig } from 'angularfire2';
import { ionicBootstrap, Storage, LocalStorage, NavController } from 'ionic-angular';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  // providers: [
  //     FIREBASE_PROVIDERS,
  //     defaultFirebase({
  //         apiKey: "AIzaSyA0QSxxxBURiGZqIAiUl45FXc_iyUDNXU8",
  //         authDomain: "is439activitymonitor.firebaseapp.com",
  //         databaseURL: "https://is439activitymonitor.firebaseio.com",
  //         storageBucket: "is439activitymonitor.appspot.com",
  //     })
  // ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
