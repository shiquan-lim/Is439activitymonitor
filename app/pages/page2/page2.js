// import {Component} from 'ionic-angular';
import {Component} from '@angular/core';
import * as d3 from '../../../node_modules/d3/d3';
import * as nv from '../../../node_modules/nvd3/build/nv.d3';


@Component({
  templateUrl: 'build/pages/page2/page2.html'
})

export class Page2 {
  constructor() {
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
          chart.xAxis.tickFormat(d3.format('.02f'));
          chart.yAxis.tickFormat(d3.format('.02f'));
          // chart.yAxis.tickValues(0);
          // chart.xAxis.tickValues(0);
          chart.margin({"left": 40});
          chart.interactiveUpdateDelay(300);

          //We want to show shapes other than circles.
          // chart.scatter.onlyCircles(false);

          var myData = randomData(2,10);

          nv.addGraph(loadChart);

          function loadChart() {
              d3.select('#chart2 svg')
                  .datum(myData)
                  .transition().duration(500)
                  .call(chart);

              nv.utils.windowResize(chart.update);

              return chart;
          }


          function refreshData()
          {
              let x = 0.5;  // 5 Seconds

              for(let gp = 0; gp < myData.length-1; gp++) {
                  for(let dp = 0; dp < myData[gp].values.length; dp++ ) {
                      let newX = myData[gp].values[dp].x + (Math.random() < 0.5 ? -1 : 1)*(Math.random() < 0.5 ? 0.1 : 0.2);
                      let newY = myData[gp].values[dp].y + (Math.random() < 0.5 ? -1 : 1)*(Math.random() < 0.5 ? 0.1 : 0.2);
                      let newWeight = Number(Math.sqrt(Math.pow(Math.abs(newX),2) + Math.pow(Math.abs(newY),2))).toFixed(2)
                      myData[gp].values[dp].x = newX;
                      myData[gp].values[dp].y = newY;
                      myData[gp].values[dp].distance = newWeight;
                      myData[gp].values[dp].size = newWeight;
                  }
              }
              loadChart();

              setTimeout(refreshData, x*1000);
          }


          refreshData();
      });

      /**************************************
       * Simple test data generator
       */
      var users = ["Shi Quan", "Max Chua", "Eslynn Choo", "ShiQi", "Song Rui", "Gideon", "Adam Tan", "Robert Choo", "Alvin Lee", "Sergey Kovalev","Augustine Tan", "Hwee Pink", "Chester Lim", "Amos Tan", "Joseph Lee", "Vinod Aneh", "Cheng Fu", "Zhou Wei", "Margret Thatcher", "Ahmed Azziz","Osama Bin Laden", "George Bush", "Barack Obama", "Hillary Clinton", "Donald Trump", "Joe Biden", "Shinzo Abe", "Lee Hsien Loong", "Xi Jin Ping", "Theresa May","West Brooke", "Mia Khalifa", "Tori Black", "Yan Ru", "Hitler", "Winston Churchill", "Karl Marx", "Mao ZeDong", "Stalin", "Lenin"];
      function randomData(groups, points) { //# groups,# points per group
          var data = [],
              // shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
              shapes = ['circle'],
              random = d3.random.normal();

          for (var i = 0; i < groups; i++) {
              data.push({
                  key: 'Student Group ' + i,
                  values: []
              });

              for (var j = 0; j < points; j++) {
                  let xVal = random()*3;
                  let yVal = random()*3;
                  data[i].values.push({
                      x: xVal
                      , y: yVal
                      , size: Number(Math.sqrt(Math.pow(Math.abs(xVal),2) + Math.pow(Math.abs(yVal),2))).toFixed(2)//Configure the size of each scatter point
                      , shape: "circle"  //Configure the shape of each scatter point.
                      , name: users[i * points + j]
                      , distance: Number(Math.sqrt(Math.pow(Math.abs(xVal),2) + Math.pow(Math.abs(yVal),2))).toFixed(2)
                  });
              }
          }

          data.push({
              key: 'Instructor',
              values: [{
                  x: 0
                  , y: 0
                  , size: 3//Configure the size of each scatter point
                  , shape: "circle"  //Configure the shape of each scatter point.
                  , name: "NUCLEUS"
                  , distance:0
              }]
          });

          return data;
      }
  }
}
