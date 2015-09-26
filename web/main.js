/*
    To start server, run python -m SimpleHTTPServer 8080 on command line
    then point server to http://localhost:8080/
*/

// TODO(ginellegaisano): re-factor to use javascript classes
var app = angular.module('fitBuzz', []);

function sleepSchedule(startTime, schedule) {
    var scheduleData = [];
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
        scheduleData = null;
            // Do nothing
    }
    return scheduleData;
}

app.run(function($rootScope) {
    $rootScope.yourName = "Ginelle Gaisano";
    $rootScope.schedules = ["Uberman", "Everyman", "Normal", "Custom"];
    $rootScope.currentSchedule = $rootScope.schedules[0];
    $rootScope.initalTime = "12:00 AM";

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

    var svg = d3.select("#timeline1").append("svg").attr("width", 750).attr("id", "svg1")
      .datum(scheduleData).call(chart);

      $('input.timepicker').timepicker({
        minTime: new Date(0, 0, 0, 0, 0, 0),
        maxTime: new Date(0, 0, 0, 23, 30, 0),
        startHour: 0,
        change: function(time) {
            var dateTime = new Date(time);
            var customStartTime = startTime + convertTimeToMilliseconds(dateTime.getHours(), TimeEnum.HOURS)
                + convertTimeToMilliseconds(dateTime.getMinutes(), TimeEnum.MINUTES);
            chart.beginning(customStartTime);
            chart.ending(customStartTime + convertTimeToMilliseconds(24, TimeEnum.HOURS));
            chart.tickFormat({
              format: d3.time.format("%I%p"),
              tickTime: d3.time.hours,
              tickInterval: 2,
              tickSize: 6
            });
            var scheduleData = sleepSchedule(customStartTime, $rootScope.currentSchedule);
            if (scheduleData == null) {
                console.log("invalid schedule.");
                return;
            }
            $("#svg2").remove();
            svg = d3.select("#timeline2").append("svg").attr("width", 750).attr("id", "svg2")
                .datum(scheduleData).call(chart);
            }
      });

    $rootScope.selectSchedule = function(schedule) {
        var scheduleData = sleepSchedule(startTime, schedule);
        if (scheduleData == null) {
            console.log("invalid schedule.");
            return;
        }
        $rootScope.initalTime = "";
        chart.beginning(startTime);
        chart.ending(endTime);
        chart.tickFormat({
          format: d3.time.format("%I%p"),
          tickTime: d3.time.hours,
          tickInterval: 2,
          tickSize: 3
        });
        chart.width(750);
        $rootScope.currentSchedule = schedule;
        $("#svg1").remove();
        $("#svg2").remove();
        $("#timepicker1").val('12:00 AM');
        svg = d3.select("#timeline1").append("svg").attr("width", 750).attr("id", "svg1")
            .datum(scheduleData).call(chart);

    };
});
