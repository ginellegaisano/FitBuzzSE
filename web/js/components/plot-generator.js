/*
Plot Generator Module:
  Plots various metrics (ie. heartrate) tracked by the FitBit.

  TODO: pull real data
*/

function getHeartRates() {
  var data = [
    {datetime: "0:00", close: 65},
    {datetime: "1:00", close: 66},
    {datetime: "2:00", close: 64},
    {datetime: "3:00", close: 68},
    {datetime: "4:00", close: 80},
    {datetime: "5:00", close: 82},
    {datetime: "6:00", close: 61},
    {datetime: "7:00", close: 65},
    {datetime: "8:00", close: 64},
    {datetime: "9:00", close: 65},
    {datetime: "10:00", close: 60},
    {datetime: "11:00", close: 64},
    {datetime: "12:00", close: 66},
    {datetime: "13:00", close: 65},
    {datetime: "14:00", close: 64},
    {datetime: "15:00", close: 65},
    {datetime: "16:00", close: 67},
    {datetime: "17:00", close: 54},
    {datetime: "18:00", close: 55},
    {datetime: "19:00", close: 54},
    {datetime: "20:00", close: 53},
    {datetime: "21:00", close: 55},
    {datetime: "22:00", close: 65},
    {datetime: "23:00", close: 66}
  ];
  return data;
}

function generateHeartRatePlot() {
  $( "#datepicker" ).datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
  var margin = {top: 20, right: 20, bottom: 100, left: 50},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%H:%M").parse;

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
      .x(function(d) { return x(d.datetime); })
      .y(function(d) { return y(d.close); });

  var svg = d3.select("#heartrate-graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data = getHeartRates();
  data.forEach(function(d) {
    d.datetime = parseDate(d.datetime);
    d.close = +d.close;
  });

  x.domain(d3.extent(data, function(d) { return d.datetime; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")  
            .style("text-anchor", "end")
            .style("font-size","13px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll("text")
        .style("font-size","13px")
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Heart Rate (BPM)")
        .style("font-size","13px");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
}

function getSleepTimes() {
  var data = [
    {Hour: 1, minutesToFallAsleep: 30, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 2, minutesToFallAsleep: 28, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 3, minutesToFallAsleep: 25, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 4, minutesToFallAsleep: 22, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 5, minutesToFallAsleep: 15, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 6, minutesToFallAsleep: 10, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 7, minutesToFallAsleep: 5, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 8, minutesToFallAsleep: 3, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 9, minutesToFallAsleep: 2, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5},
    {Hour: 10, minutesToFallAsleep: 1, minutesAsleep: 20, minutesAwake: 5, minutesAfterWakeup: 5}
  ];
  return data;
}

function generateSleepPlot() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .rangeRound([height, 0]);

  var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  var svg = d3.select("#sleeptime-graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = getSleepTimes();

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Hour"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.sleepInterval = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.sleepInterval[d.sleepInterval.length - 1].y1;
  });

  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.Hour; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("font-size","13px");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll("text")
        .style("font-size","13px")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Time in Bed (Minutes)")
      .style("font-size","13px");

  var hour = svg.selectAll(".hour")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.Hour) + ",0)"; });

  hour.selectAll("rect")
      .data(function(d) { return d.sleepInterval; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
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
   generateSleepPlot();
}]);

