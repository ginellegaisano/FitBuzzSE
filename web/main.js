/*
    To start server, run python -m SimpleHTTPServer 63342 on command line
    then point server to http://localhost:63342/
*/

// TODO(ginellegaisano): re-factor to use javascript classes
var app = angular.module('fitBuzz', ['schedulePickerModule', 'plotGeneratorModule']);

app.controller('FitBuzzController', ['$scope', function($scope) {
    $scope.yourName = "Ginelle Gaisano";
    $scope.showScheduler = true;
}]);
