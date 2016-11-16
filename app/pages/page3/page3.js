// import {Component} from 'ionic-angular';
import {Component} from '@angular/core';
import {IBeacon} from 'ionic-native';
import { NavController, Events, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Component({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
    // message: FirebaseListObservable<any>;
    static get parameters() {
        return [[AngularFire], [Events], [ToastController]];
    }

    constructor(af, events, toastCtrl) {
      this.pingPath = af.database.list('/childData');
      this.isRanging = false;
        this.registrationPath = af.database.object('/registration');
        this.registrationPath.subscribe((data) => {
            this.registration = data;
        });
        this.registrationPath.subscribe((data) => {
            this.dbRegistered = data;
        });
        this.event = events;
        this.toastCtrl = toastCtrl;
    }

    launchBeacons() {
        this.isRanging = true;
        try {
            // Request permission to use location on iOS
            IBeacon.requestAlwaysAuthorization();
            // create a new delegate and register it with the native layer
            let delegate = IBeacon.Delegate();
            IBeacon.setDelegate(delegate);

            // this.beaconInfo = {};
            var self = this;
            this.beaconInfo = [];
            this.beaconRegistration = {
                "fda50693-a4e2-4fb1-afcf-c6eb0764782511": "Max Chua",
                "fda50693-a4e2-4fb1-afcf-c6eb0764782522": "Gideon Raj"
            };

            // setTimeout(writeBeacons, 2000);
            
            function writeBeacons() {
                for(let bIndex in self.beaconInfo) {
                    // console.log(JSON.stringify(self.beaconInfo[beacon]));
                    let beacon = self.beaconInfo[bIndex];
                    self.pingPath.push(
                        {
                            uuid: beacon.uuid,
                            major: beacon.major,
                            minor: beacon.minor,
                            timestamp: Date.now(),
                            proximity: beacon.accuracy,
                            isMonitoring: beacon.accuracy >= 0,
                            associatedChild: self.beaconRegistration[beacon.uuid.toLowerCase() + beacon.major + beacon.minor]
                        }
                    )
                }
                setTimeout(writeBeacons, 60000);
            }

            delegate.didRangeBeaconsInRegion()
                .subscribe(function (pluginResult) {
                    // console.log(self.beaconInfo);
                    // console.log('didRangeBeaconsInRegion: ', pluginResult.beacons);
                    self.beaconInfo = pluginResult.beacons;
                    self.event.publish('beacons:ranged', self.beaconInfo);
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

        } catch (e) {
            console.log('error: ', e);
        }
    }

    cutBeacons() {
        this.isRanging = false;
        // this.beaconInfo = [];
        try {
            // IBeacon.stopMonitoringForRegion(this.beaconRegion)
            //     .then(function () {
            //         console.log(this.beaconRegion);
            //        I
            //     });
            IBeacon.stopRangingBeaconsInRegion(this.beaconRegion)
                .then(function () {
                    console.log(this.beaconRegion);
                });
        } catch (e) {
            console.log('error', e);
        }
    }

    blabla() {
        this.message.push({
            message: "Connection test"
        }).then( newBill => {
            console.log("message written to DB");
        }, error => {
            console.log(error);
        });
    }

    registerBeacon(uuid) {
        // console.log(this.registration);
        // console.log(this.dbRegistered);
        var retObj = {}
        retObj[uuid] = this.registration[uuid];
        this.registrationPath.update(retObj);
        let toast = this.toastCtrl.create({
            message: 'Beacon successfully registered',
            duration: 1000
        });
        toast.present();
    }

    removeAssociation(uuid) {
        var retObj = {}
        retObj[uuid] = null;
        this.registrationPath.update(retObj);
        let toast = this.toastCtrl.create({
            message: 'Beacon successfully de-registered',
            duration: 1000
        });
        toast.present();
    }
}
