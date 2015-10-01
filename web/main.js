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
    var options = {min: startTime,
        max: endTime,
        zoomable: false,
        showCurrentTime: false,
    };

    // Create a Timeline
    var timeline1 = new vis.Timeline(document.getElementById('timeline1'), items, options);
    var timeline2 = new vis.Timeline(document.getElementById('timeline2'), items, options);

    $('input.timepicker').timepicker({
        startHour: 0,
        change: function(time) {
            var dateTime = new Date(time);
            var customStartTime = startTime + convertTimeToMilliseconds(dateTime.getHours(), TimeEnum.HOURS)
                + convertTimeToMilliseconds(dateTime.getMinutes(), TimeEnum.MINUTES);
            var scheduleTimes = sleepScheduleTimes(customStartTime, $rootScope.currentSchedule);
            if (scheduleTimes == null) {
                console.log("invalid schedule.");
                return;
            }
            var options = {min: customStartTime,
                max: customStartTime + convertTimeToMilliseconds(23, TimeEnum.HOURS),
                zoomable: false,
                showCurrentTime: false,
                start: customStartTime,
                };
            timeline2.setItems(scheduleTimes);
            timeline2.setOptions(options);

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
        timeline1.setItems(scheduleTimes);
    };
});