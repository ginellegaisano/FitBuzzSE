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
    var endTime = (new Date()).setHours(24,0,0,0);
    var times = calculateUbermanSleepSchedule(startTime);

    var items = new vis.DataSet(times);
    var options = createVisOptions(startTime, endTime);
    var timeline = new vis.Timeline(document.getElementById('timeline'), items, options);

    $('input.timepicker').timepicker({
        dynamic: 0,
        startHour: 0,
        timeFormat: 'h:mm p',
        change: function(time) {
            var dateTime = new Date(time);
            var customStartTime = startTime + convertTimeToMilliseconds(dateTime.getHours(), TimeEnum.HOURS)
                + convertTimeToMilliseconds(dateTime.getMinutes(), TimeEnum.MINUTES);
            var scheduleTimes = sleepScheduleTimes(customStartTime, $scope.currentSchedule);
            if (scheduleTimes == null) {
                console.log("invalid schedule.");
                return;
            }
            var options = createVisOptions (
                startTime,
                customStartTime + convertTimeToMilliseconds(24, TimeEnum.HOURS));
            timeline.setItems(scheduleTimes);
            timeline.setOptions(options);
            timeline.fit();

        },
      });

    $scope.selectSchedule = function(schedule) {
        var scheduleTimes = sleepScheduleTimes(startTime, schedule);
        if (scheduleTimes == null) {
            console.log("invalid schedule.");
            return;
        }
        $scope.currentSchedule = schedule;
        $("input.timepicker").change();
    };
}]);
