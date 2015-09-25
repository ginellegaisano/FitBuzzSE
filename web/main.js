/* 
    To start server, run python -m SimpleHTTPServer 8080 on command line
    then point server to http://localhost:8080/
*/

// TODO(ggaisano): re-factor to use javascript classes
var app = angular.module('fitBuzz', []);

app.run(function($rootScope) {
    $rootScope.yourName = "Ginelle Gaisano";
    $rootScope.schedules = ["Uberman", "Everyman", "Normal"];
    $rootScope.currentSchedule = $rootScope.schedules[0];

    $rootScope.selectSchedule = function(schedule) {
        $rootScope.currentSchedule = schedule;
    };

    var d = Date.now();
    var startTime = (new Date()).setHours(0,0,0,0);
    var endTime = (new Date()).setHours(24,0,0,0);

    var times = calculateUbermanWeeklySleepSchedule(startTime);
    var uberData =  [{times: times}];

    // Setting up sleep schedule timeline
    var chart = d3.timeline();
    chart.tickFormat({
      format: d3.time.format("%I:%M%p"),
      tickTime: d3.time.minutes,
      tickInterval: 15,
      tickSize: 6
    });

    var svg = d3.select("#timeline1").append("svg").attr("width", 80000)
      .datum(uberData).call(chart);
});
