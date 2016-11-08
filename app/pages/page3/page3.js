// import {Component} from 'ionic-angular';
import {Component} from '@angular/core';
import {IBeacon} from 'ionic-native';


@Component({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  constructor() {
      this.beaconPlaceholder = {
          ping: 'idnkedle',
          dist: 22
      };
      try {
          // Request permission to use location on iOS
          IBeacon.requestAlwaysAuthorization();
          // create a new delegate and register it with the native layer
          let delegate = IBeacon.Delegate();

          // Subscribe to some of the delegate's event handlers
          delegate.didRangeBeaconsInRegion()
              .subscribe(
                  data => console.log('didRangeBeaconsInRegion: ', JSON.stringify(data)),
                  error => console.error()
              );
          // delegate.didStartMonitoringForRegion()
          //     .subscribe(
          //         data => console.log('didStartMonitoringForRegion: ', JSON.stringify(data)),
          //         error => console.error()
          //     );


          delegate.didStartMonitoringForRegion = function (pluginResult) {
              console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
              this.beaconArr = pluginResult.beacons;
              console.log('beaconArr' + pluginResult.beacons);
          };

          


          delegate.didEnterRegion()
              .subscribe(
                  data => {
                      console.log('didEnterRegion: ', JSON.stringify(data));
                  }
              );

          IBeacon.setDelegate(delegate);

          // lightBlue UUID
          // this.beaconRegion = IBeacon.BeaconRegion('SKYBEACON1','B5FF04D7-5F8C-42AF-B670-2767AFA95B0D');
          // skybeacon UUID
          this.beaconRegion = IBeacon.BeaconRegion('SKYBEACON','fda50693-a4e2-4fb1-afcf-c6eb07647825');
          this.printable = JSON.stringify(this.beaconRegion);

          IBeacon.startMonitoringForRegion(this.beaconRegion)
              .then(
                  () => console.log('Native layer recieved the request to monitoring', JSON.stringify(this.beaconRegion)),
                  error => console.error('Native layer failed to begin monitoring: ', error)
              );
          IBeacon.startRangingBeaconsInRegion(this.beaconRegion)
              .then(
                  () => console.log('Native layer recieved the request for ranging', JSON.stringify(this.beaconRegion)),
                  error => console.error('Native layer failed to begin monitoring: ', error)
              );
          // IBeacon.startAdvertising(this.beaconRegion)
          //     .then(
          //         () => console.log('Native layer recieved the request for advertising'),
          //         error => console.error('Native layer failed to begin monitoring: ', error)
          //     );

          // Gideons code
          this.blabla = function() {
              console.log("I made it!");
          };
      } catch (e) {
          console.log('error: ', e);
      }
  }
}
