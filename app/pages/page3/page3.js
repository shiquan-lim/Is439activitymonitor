// import {Component} from 'ionic-angular';
import {Component} from '@angular/core';
import {IBeacon} from 'ionic-native';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
    // message: FirebaseListObservable<any>;
    static get parameters() {
        return [[AngularFire]];
    }

    constructor(af) {
      // public af: AngularFire
      this.message = af.database.list('/items');
    }

    launchBeacons() {
        try {
            // Request permission to use location on iOS
            IBeacon.requestAlwaysAuthorization();
            // create a new delegate and register it with the native layer
            let delegate = IBeacon.Delegate();
            IBeacon.setDelegate(delegate);

            // this.beaconInfo = {};
            var self = this;
            this.beaconInfo = [];

            delegate.didRangeBeaconsInRegion()
                .subscribe(function (pluginResult) {
                    // console.log(self.beaconInfo);
                    // console.log('didRangeBeaconsInRegion: ', pluginResult.beacons);
                    self.beaconInfo = pluginResult.beacons;
                    // for(var i = 0; i < pluginResult.beacons.length; i++) {
                    //     this.beaconInfo.beacons[i] = pluginResult.beacons[i];
                    // }
                    // console.log('Current beaconInfo: ', self.beaconInfo);
                });

            delegate.didStartMonitoringForRegion = function (pluginResult) {
                console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
            };

            // delegate.didEnterRegion = function()
            //     .subscribe(
            //         data => {
            //             console.log('didEnterRegion: ', JSON.stringify(data));
            //         }
            //     );

            IBeacon.setDelegate(delegate);

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

            IBeacon.startMonitoringForRegion(this.beaconRegion)
                .then(
                    () => console.log('Native layer recieved the request to monitoring', JSON.stringify(this.beaconRegion)),
                error => console.error('Native layer failed to begin monitoring: ', error)
                );

        } catch (e) {
            console.log('error: ', e);
        }
    }

    blabla() {
        this.message.push({
            "Message": "Connection test"
        }).then( newBill => {
            console.log("message written to DB");
        }, error => {
            console.log(error);
        });
        // console.log("okaayy");
    }

    registerBeacon(uuid) {
        console.log(uuid);
        console.log(this.registration);
    }
}
