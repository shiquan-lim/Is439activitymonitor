import {Page} from 'ionic-angular';
import * as d3 from '../../../node_modules/d3/d3';
import * as nv from '../../../node_modules/nvd3/build/nv.d3';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})

export class Page2 {
  constructor() {
      nv.addGraph(function() {
          var chart = nv.models.scatterChart()
              // .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
              // .showDistY(true)
          // .transitionDuration(350)
              .clipEdge(true)
              .color(d3.scale.category10().range());

          //Configure how the tooltip looks.
          chart.tooltip.contentGenerator(function (obj) {
              console.log(obj);
             return obj.point.name + "\n" + obj.point.distance + " cm away"
          });

          //Axis settings
          chart.xAxis.tickFormat(d3.format('.02f'));
          chart.yAxis.tickFormat(d3.format('.02f'));
          chart.margin({"left": 40});

          //We want to show shapes other than circles.
          // chart.scatter.onlyCircles(false);

          var myData = randomData(4,10);
          d3.select('#chart2 svg')
              .datum(myData)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
      });

      /**************************************
       * Simple test data generator
       */
      function randomData(groups, points) { //# groups,# points per group
          var data = [],
              // shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
              shapes = ['circle'],
              random = d3.random.normal();

          for (var i = 0; i < groups; i++) {
              data.push({
                  key: 'Group ' + i,
                  values: []
              });

              for (var j = 0; j < points; j++) {
                  let xVal = random();
                  let yVal = random();
                  data[i].values.push({
                      x: xVal
                      , y: yVal
                      , size: (Math.abs(xVal)) * (Math.abs(yVal))//Configure the size of each scatter point
                      , shape: "circle"  //Configure the shape of each scatter point.
                      , name: "Shi Quan"
                      , distance: 30
                  });
              }
          }

          return data;
      }
  }
}
