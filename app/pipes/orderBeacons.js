/**
 * Created by limshiquan on 16/11/16.
 */
import {Pipe} from '@angular/core';

@Pipe({
    name: 'orderBeacons'
})
export class orderBeacons {
    transform(beaconArr) {
        if(beaconArr) {
            return beaconArr.sort(function(a, b) {
                if(a.proximity == 'ProximityUnknown' || a.accuracy < 0 || b.proximity == 'ProximityUnknown' || b.accuracy < 0) {
                    return a.accuracy - b.accuracy;
                } else {
                    return b.accuracy - a.accuracy;
                }
            });
        }
        return beaconArr;
    }
}