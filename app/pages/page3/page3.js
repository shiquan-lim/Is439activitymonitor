// import {Component} from 'ionic-angular';
import {Component} from '@angular/core';
import {IBeacon} from 'ionic-native';
import { NavController, Events, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Component({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
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

            var self = this;
            this.beaconInfo = [];

            setTimeout(writeBeacons, 2000);
            
            function writeBeacons() {
                for(let bIndex in self.beaconInfo) {
                    let beacon = self.beaconInfo[bIndex];
                    self.pingPath.push(
                        {
                            uuid: beacon.uuid,
                            major: beacon.major,
                            minor: beacon.minor,
                            timestamp: Date.now(),
                            proximity: beacon.accuracy / 2,
                            isMonitoring: beacon.accuracy >= 0,
                            associatedChild: self.registration[beacon.uuid + beacon.major + beacon.minor]
                        }
                    )
                }
                setTimeout(writeBeacons, 30000);
            }

            delegate.didRangeBeaconsInRegion()
                .subscribe(function (pluginResult) {
                    self.beaconInfo = pluginResult.beacons;
                    self.event.publish('beacons:ranged', self.beaconInfo);
                });

            delegate.didStartMonitoringForRegion = function (pluginResult) {
                console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
            };

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
        try {
            IBeacon.stopRangingBeaconsInRegion(this.beaconRegion)
                .then(function () {
                    console.log(this.beaconRegion);
                });
        } catch (e) {
            console.log('error', e);
        }
    }

    registerBeacon(uuid) {
        var retObj = {};
        retObj[uuid] = this.registration[uuid];
        this.registrationPath.update(retObj);
        let toast = this.toastCtrl.create({
            message: 'Beacon successfully registered',
            duration: 1000,
            position: 'top'
        });
        toast.present();
    }

    removeAssociation(uuid) {
        var retObj = {};
        retObj[uuid] = null;
        this.registrationPath.update(retObj);
        let toast = this.toastCtrl.create({
            message: 'Beacon successfully de-registered',
            duration: 1000,
            position: 'top'
        });
        toast.present();
    }
}
