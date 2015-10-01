/*
    To start server, run python -m SimpleHTTPServer 63342 on command line
    then point server to http://localhost:63342/
*/

// TODO(ginellegaisano): re-factor to use javascript classes
var app = angular.module('fitBuzz', []);

function sleepScheduleTimes(startTime, schedule) {
    var scheduleData = [];
    switch (schedule) {
        case "Uberman":
            scheduleData = calculateUbermanSleepSchedule(startTime);
            break;
        case "Everyman":
            scheduleData = calculateEverymanSleepSchedule(startTime);
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

function createOptions(startTime, endTime) {
    return {min: startTime,
        max: endTime,
        zoomable: false,
        showCurrentTime: false,
        autoResize: false,
        format: {
              minorLabels: {
                minute: 'h:mm a',
                hour: 'h:mm a',
              },
              majorLabels: {
                second: 'D MMMM h:mm a',
              }
        },
    };
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

    // trying out vis timeline library
    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet(times);

    // Configuration for the Timeline
    var options = createOptions(startTime, endTime)

    // Create a Timeline
    var timeline = new vis.Timeline(document.getElementById('timeline'), items, options);

    $('input.timepicker').timepicker({
        dynamic: 0,
        startHour: 0,
        timeFormat: 'h:mm p',
        change: function(time) {
            var dateTime = new Date(time);
            var customStartTime = startTime + convertTimeToMilliseconds(dateTime.getHours(), TimeEnum.HOURS)
                + convertTimeToMilliseconds(dateTime.getMinutes(), TimeEnum.MINUTES);
            var scheduleTimes = sleepScheduleTimes(customStartTime, $rootScope.currentSchedule);
            if (scheduleTimes == null) {
                console.log("invalid schedule.");
                return;
            }
            var options = createOptions (
                startTime,
                customStartTime + convertTimeToMilliseconds(24, TimeEnum.HOURS));
            timeline.setItems(scheduleTimes);
            timeline.setOptions(options);
            timeline.fit();

        },
      });

    $rootScope.selectSchedule = function(schedule) {
        var scheduleTimes = sleepScheduleTimes(startTime, schedule);
        if (scheduleTimes == null) {
            console.log("invalid schedule.");
            return;
        }
        $rootScope.currentSchedule = schedule;
        $("input.timepicker").change();
    };
});
