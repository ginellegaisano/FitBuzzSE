/*
    To start server, run python -m SimpleHTTPServer 8080 on command line
    then point server to http://localhost:8080/
*/

// TODO(ginellegaisano): re-factor to use javascript classes
var app = angular.module('fitBuzz', []);

app.run(function($rootScope) {
    $rootScope.yourName = "Ginelle Gaisano";
    $rootScope.schedules = ["Uberman", "Everyman", "Normal", "Custom"];
    $rootScope.currentSchedule = $rootScope.schedules[0];

    var d = Date.now();
    var startTime = (new Date()).setHours(0,0,0,0);
    var endTime = (new Date()).setHours(24,0,0,0);

    var times = calculateUbermanSleepSchedule(startTime);
    var scheduleData =  [{times: times}];

    // Setting up sleep schedule timeline
    var chart = d3.timeline();
    chart.beginning(startTime);
    chart.ending(endTime);
    chart.tickFormat({
      format: d3.time.format("%I%p"),
      tickTime: d3.time.hours,
      tickInterval: 2,
      tickSize: 3
    });

    var svg = d3.select("#timeline1").append("svg").attr("width", 750)
      .datum(scheduleData).call(chart);

    $rootScope.selectSchedule = function(schedule) {
        switch (schedule) {
            case "Uberman":
                scheduleData = [{times: calculateUbermanSleepSchedule(startTime)}];
                break;
            case "Everyman":
                scheduleData = [{times: calculateEverymanSleepSchedule(startTime)}];
                break;
            case "Normal":
                // TODO(ginellegaisano): add Normal schedule
                break;
            case "Custom":
                // Do nothing
                break;
            default:
                console.log("invalid schedule.");
                return;
        }
        $rootScope.currentSchedule = schedule;
        $("svg").remove();
        svg = d3.select("#timeline1").append("svg").attr("width", 750)
            .datum(scheduleData).call(chart);
    };
});
