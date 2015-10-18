/*
Plot Generator Module:
  Plots various metrics (ie. heartrate) tracked by the FitBit.

  TODO: pull real data
*/

function getHeartRates() {
  var times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00",
  "8:00", "9:00", "10:00","11:00","12:00","13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00" ];
  var data = [];
  for (var i = 0; i < times.length; i++) {
    var onePoint = {datetime: times[i], close: Math.floor(Math.random() * (80-70)) + 71};
    data.push(onePoint);
  }
  return data;
}

function getSleepTimes() {
  var sleepData = [];
  var times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00",
  "8:00", "9:00", "10:00","11:00","12:00","13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00" ];
  var data = [];
  for (var i = 0; i < times.length; i++) {
    var currPoint;
    if (i % 4 != 0) {
      currPoint = {
        Hour: times[i],
        MinutesToFallAsleep: 0,
        MinutesAsleep: 0,
        MinutesAwake: 0,
        MinutesAfterWakeup: 0
      }
    } else {
       currPoint = {
        Hour: times[i],
        MinutesToFallAsleep: Math.floor(Math.random() * (25-5)) + 6,
        MinutesAsleep: Math.floor(Math.random() * (25-20)) + 21,
        MinutesAwake: Math.floor(Math.random() * (5-1)) + 2,
        MinutesAfterWakeup: Math.floor(Math.random() * (3-1)) + 1
      };
    }
    sleepData.push(currPoint);
  }
  
  return sleepData;
}

function displayDatepicker() {
  $( "#datepicker" ).datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });

  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();

  var today = (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day + '/' +
    d.getFullYear();

  $( "#datepicker" ).val(today);
}

function generateHeartRatePlot() {
  var parseDate = d3.time.format("%H:%M").parse;
  var data = getHeartRates();

  var margin = {top: 20, right: 20, bottom: 100, left: 50},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format("%I %p"))
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

function generateSleepPlot() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 600 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width - 100], .1);

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
      .attr("height", height + 50 + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = getSleepTimes();

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Hour"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.sleepInterval = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.sleepInterval[d.sleepInterval.length - 1].y1;
  });

  //data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.Hour; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);

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
      .style("font-size","13px")
      .text(function(d) { return d.replace(/([a-z])([A-Z])/g, '$1 $2'); });
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
  $scope.refreshPlots = function() {
    $( "#heartrate-graph" ).empty();
    $( "#sleeptime-graph" ).empty();
     generateHeartRatePlot();  
     generateSleepPlot();
  }
  displayDatepicker();
  generateHeartRatePlot();
  generateSleepPlot();
}]);

