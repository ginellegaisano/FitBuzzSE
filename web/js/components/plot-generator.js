/*
Plot Generator Module:
  Plots various metrics (ie. heartrate) tracked by the FitBit.

  TODO: pull real data
*/

function getHeartRates() {
  var data = [{date: "1-May-15", close: 480}, {date: "3-May-15", close: 550}, {date: "5-May-15", close: 430}];
  return data;
}

function generateHeartRatePlot() {
  $( "#datepicker" ).datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

  var svg = d3.select("#metrics-graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data = getHeartRates();
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Heart Rate (BPM)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
}

function generateSleepPlot() {

}

var plotGeneratorModule = angular.module('plotGeneratorModule', []);

plotGeneratorModule.directive('plotGenerator', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'js/components/plot-generator.html',
  };
});

plotGeneratorModule.controller('plotGeneratorController', ['$scope', function($scope) {
   generateHeartRatePlot();
}]);

