import {Events} from 'ionic-angular';
import {Component} from '@angular/core';
import * as d3 from '../../../node_modules/d3/d3';
import * as nv from '../../../node_modules/nvd3/build/nv.d3';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {orderBeacons} from '../../pipes/orderBeacons';


@Component({
  templateUrl: 'build/pages/page2/page2.html',
    pipes: [orderBeacons]
})

export class Page2 {
    static get parameters() {
        return [[AngularFire], [Events]];
    }

  constructor(af, events) {

      this.registrationPath = af.database.object('/registration');
      this.registrationPath.subscribe((data) => {
          this.registration = data;
        });

      var self = this;

      events.subscribe('beacons:ranged', (beaconData) => {
          // [[{"minor":2,"rssi":0,"major":2,"proximity":"ProximityUnknown","accuracy":-1,"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":1,"rssi":-45,"major":1,"proximity":"ProximityNear","accuracy":0.37,"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"}]]
          this.data = beaconData[0];
            // console.log(this.data);
      });

      nv.addGraph(function() {
          var chart = nv.models.scatterChart()
          // .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
          // .showDistY(true)
          // .transitionDuration(350)
          //     .clipEdge(true)
          //     .showYAxis(false)
          //     .showXAxis(false)
              .color(d3.scale.category10().range());

          //Configure how the tooltip looks.
          chart.tooltip.contentGenerator(function (obj) {
              return obj.point.name + "\n" + obj.point.distance + " m away"
          });

          //Axis settings
          chart.xAxis.tickFormat(d3.format('.01f'));
          chart.yAxis.tickFormat(d3.format('.01f'));
          // chart.yAxis.tickValues(0);
          // chart.xAxis.tickValues(0);
          chart.margin({"left": 30});
          chart.interactiveUpdateDelay(300);

          // We want to show shapes other than circles.
          // chart.scatter.onlyCircles(false);

          // var myData = randomData(2,10);
          var myData = [];
          myData[0] = {
              'key': 'Students',
              'values': []
          };
          myData[1] = {
              key: 'Instructor',
              values: [{
                  x: 0
                  , y: 0
                  , size: 3//Configure the size of each scatter point
                  , shape: "circle"  //Configure the shape of each scatter point.
                  , name: "NUCLEUS"
                  , distance: 0
              }]
          };
          myData[2] = {
              key: 'Warning 1',
              values: [{
                  x: 6
                  , y: 6
                  , size: 6//Configure the size of each scatter point
                  , shape: "circle"  //Configure the shape of each scatter point.
                  , name: "Warning 1"
                  , distance: 6
              }]
          };
          myData[3] = {
              key: 'Warning 2',
              values: [{
                  x: 7
                  , y: 7
                  , size: 7//Configure the size of each scatter point
                  , shape: "circle"  //Configure the shape of each scatter point.
                  , name: "Warning 2"
                  , distance: 7
              }]
          };

          if (self.data) {
              myData[0].values = self.data.filter(function (bI) {
                  return bI.accuracy >= 0 && bI.proximity != 'ProximityUnknown';
              }).map(function (bI) {
                  return {
                      x: bI.accuracy
                      , y: bI.accuracy
                      , size: bI.accuracy //Configure the size of each scatter point
                      , shape: "circle"  //Configure the shape of each scatter point.
                      , name: "NUCLEUS"
                      , distance: bI.accuracy
                  }
              })
          }

          nv.addGraph(loadChart);

          // setTimeout(generateLatestPing, 5000);
          //
          // function generateLatestPing() {
          //     console.log(myData);
          // }

          function loadChart() {
              d3.select('#chart2 svg')
                  .datum(myData)
                  .transition().duration(500)
                  .call(chart);

              nv.utils.windowResize(chart.update);

              return chart;
          }

          // var kvArray = [{key: 1, value: 10}, {key: 2, value: 20}, {key: 3, value: 30}];
          // var reformattedArray = kvArray.map(function (obj) {
          //     var rObj = {};
          //     rObj[obj.key] = obj.value;
          //     return rObj;
          // });


          function refreshData() {
              let x = 1;  // x Seconds

              // for(let gp = 0; gp < myData.length-1; gp++) {
              //     myData[gp].values = myData[gp].values.map(function (obj) {
              //         let retObj = obj;
              //         let newX = retObj.x + (Math.random() < 0.5 ? -1 : 1)*(Math.random() < 0.5 ? 0.1 : 0.2);
              //         let newY = retObj.y + (Math.random() < 0.5 ? -1 : 1)*(Math.random() < 0.5 ? 0.1 : 0.2);
              //         let newWeight = Number(Math.sqrt(Math.pow(Math.abs(newX),2) + Math.pow(Math.abs(newY),2))).toFixed(2);
              //         retObj.x = newX;
              //         retObj.y = newY;
              //         retObj.distance = newWeight;
              //         retObj.size = newWeight;
              //         return retObj;
              //     });

              if (self.data) {
                  myData[0] = {
                      'key': 'Students',
                      'values': []
                  };
                  myData[0].values = self.data.filter(function (bI) {
                      return bI.accuracy >= 0 && bI.proximity != 'ProximityUnknown';
                  }).map(function (bI) {
                      return {
                          x: bI.accuracy
                          , y: bI.accuracy
                          , size: bI.accuracy //Configure the size of each scatter point
                          , shape: "circle"  //Configure the shape of each scatter point.
                          , name: "NUCLEUS"
                          , distance: bI.accuracy
                      }
                  })
              }
              // for(let dp = 0; dp < myData[gp].values.length; dp++ ) {
              //     let newX = myData[gp].values[dp].x + (Math.random() < 0.5 ? -1 : 1)*(Math.random() < 0.5 ? 0.1 : 0.2);
              //     let newY = myData[gp].values[dp].y + (Math.random() < 0.5 ? -1 : 1)*(Math.random() < 0.5 ? 0.1 : 0.2);
              //     let newWeight = Number(Math.sqrt(Math.pow(Math.abs(newX),2) + Math.pow(Math.abs(newY),2))).toFixed(2)
              //     myData[gp].values[dp].x = newX;
              //     myData[gp].values[dp].y = newY;
              //     myData[gp].values[dp].distance = newWeight;
              //     myData[gp].values[dp].size = newWeight;
              // }
              loadChart();

              setTimeout(refreshData, x * 1000);
          }

          // console.log(myData);
          // this.path = af.database.list('/studentData');
          // setTimeout(changeWriteStatus, 60000)
          // if()

          refreshData();
      });
      }

      /**************************************
       * Simple test data generator
       */
      // var users = ["Shi Quan", "Max Chua", "Eslynn Choo", "ShiQi", "Song Rui", "Gideon", "Adam Tan", "Robert Choo", "Alvin Lee", "Sergey Kovalev","Augustine Tan", "Hwee Pink", "Chester Lim", "Amos Tan", "Joseph Lee", "Vinod Aneh", "Cheng Fu", "Zhou Wei", "Margret Thatcher", "Ahmed Azziz","Osama Bin Laden", "George Bush", "Barack Obama", "Hillary Clinton", "Donald Trump", "Joe Biden", "Shinzo Abe", "Lee Hsien Loong", "Xi Jin Ping", "Theresa May","West Brooke", "Mia Khalifa", "Tori Black", "Yan Ru", "Hitler", "Winston Churchill", "Karl Marx", "Mao ZeDong", "Stalin", "Lenin"];
      //
      // function randomData(groups, points) { //# groups,# points per group
      //     var data = [],
      //         shapes = ['circle'],
      //         random = d3.random.normal();
      //
      //     for (var i = 0; i < groups; i++) {
      //         data.push({
      //             key: 'Student Group ' + i,
      //             values: []
      //         });
      //
      //         for (var j = 0; j < points; j++) {
      //             let xVal = random()*3;
      //             let yVal = random()*3;
      //             data[i].values.push({
      //                 x: xVal
      //                 , y: yVal
      //                 , size: Number(Math.sqrt(Math.pow(Math.abs(xVal),2) + Math.pow(Math.abs(yVal),2))).toFixed(2)//Configure the size of each scatter point
      //                 , shape: "circle"  //Configure the shape of each scatter point.
      //                 , name: users[i * points + j]
      //                 , distance: Number(Math.sqrt(Math.pow(Math.abs(xVal),2) + Math.pow(Math.abs(yVal),2))).toFixed(2)
      //             });
      //         }
      //     }
      //
      //     data.push({
      //         key: 'Instructor',
      //         values: [{
      //             x: 0
      //             , y: 0
      //             , size: 3//Configure the size of each scatter point
      //             , shape: "circle"  //Configure the shape of each scatter point.
      //             , name: "NUCLEUS"
      //             , distance:0
      //         }]
      //     });
      //
      //     return data;
      // }
}
