/**
 * Created by limshiquan on 16/11/16.
 */
import {Pipe} from '@angular/core';

@Pipe({
    name: 'orderBeacons'
})
export class orderBeacons {
    transform(beaconArr) {
        console.log('Data to be filtered', JSON.stringify(beaconArr));
        // var retArr = beaconArr.sort(function (a, b) {
        //     // if(a.proximity == 'ProximityUnknown' || parseInt(a.accuracy) < 0) {
        //     //     if(b.proximity == 'ProximityUnknown' || parseInt(b.accuracy) < 0) {
        //     //         return 0;
        //     //     } else {
        //     //         return -1;
        //     //     }
        //     // }
        //     return b.accuracy - a.accuracy;
        // });
        //
        // return retArr;
        if(beaconArr) {
            return beaconArr.sort(function(a, b) {
                if(a.proximity == 'ProximityUnknown' || a.accuracy < 0) {
                    if(b.proximity == 'ProximityUnknown' || b.accuracy < 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else {
                    return b.accuracy - a.accuracy;
                }
            });
        }
        return beaconArr;
    }
}