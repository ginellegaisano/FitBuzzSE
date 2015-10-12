/*
Sleep Scheduler Picker Module:
    A component for sleep scheduler customization.

    Includes:
        - Sleep schedule dropdown
        - Start nap time picker
        - Nap schedule display for 24 hours

    Depends on the vis timeline repository.
    TODO:
        - Implement Normal and Custom sleep schedules
        - Send sleep schedule to FitBit
*/
var schedulePickerModule = angular.module('schedulePickerModule', []);

schedulePickerModule.directive('schedulerPicker', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'js/components/scheduler-picker.html',
  };
});

schedulePickerModule.controller('SchedulerPickerController', ['$scope', function($scope) {
    $scope.schedules = ["Uberman", "Everyman", "Normal", "Custom"];
    $scope.currentSchedule = $scope.schedules[0];
    $scope.initalTime = "12:00 AM";

    var d = Date.now();
    var startTime = (new Date()).setHours(0,0,0,0);
    var endTime = startTime + convertTimeToMilliseconds(24, TimeEnum.HOURS);
    var times = sleepScheduleTimes(startTime, $scope.currentSchedule);

    var options = createVisOptions(startTime, endTime);
    var timeline = new vis.Timeline(document.getElementById('timeline'));

    $('input.timepicker').timepicker({
        dynamic: 0,
        startHour: 0,
        timeFormat: 'h:mm p',
        change: function(time) {
            var dateTime = new Date(time);
            var customStartTime = startTime + convertTimeToMilliseconds(dateTime.getHours(), TimeEnum.HOURS)
                + convertTimeToMilliseconds(dateTime.getMinutes(), TimeEnum.MINUTES);
            times = sleepScheduleTimes(customStartTime, $scope.currentSchedule);
            if (times == null) {
                console.log("invalid schedule.");
                return;
            }
            var options = createVisOptions(
                startTime,
                customStartTime + convertTimeToMilliseconds(24, TimeEnum.HOURS)
            );
            timeline.setItems(times);
            timeline.setOptions(options);
            timeline.fit();

        },
      });

    $scope.selectSchedule = function(schedule) {
        times = sleepScheduleTimes(startTime, schedule);
        if (times == null) {
            console.log("invalid schedule.");
            return;
        }
        $scope.currentSchedule = schedule;
        $("input.timepicker").change();
    };

    $scope.sendAlarms = function() {
        console.log(times);
        _.each(times, function(time){
            var startDate = new Date(time["start"]);
            var endDate = new Date(time["end"]);
            var startAlarm = formatTime(startDate.getHours(), startDate.getMinutes());
            var endAlarm = formatTime(endDate.getHours(), endDate.getMinutes());
            var startDay = DAYS[startDate.getDay()].toUpperCase();
            var endDay = DAYS[endDate.getDay()].toUpperCase();
            console.log(startAlarm + " " + startDay);
            console.log(endAlarm + " " + endDay);
            // uncomment when want to test alarms
            // fitbitAPI.setAlarm(startAlarm, startDay);
            // fitbitAPI.setAlarm(endAlarm, endDay);
        });
    }

    $scope.clearAlarms = function() {
        // TODO(ginellegaisano): hook up clear alarms when API is created
        console.log("Oops! No call implemented.");
    }

}]);
