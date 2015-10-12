/*
    To start server, run python -m SimpleHTTPServer 63342 on command line
    then point server to http://localhost:63342/
*/

// TODO(ginellegaisano): re-factor to use javascript classes
var app = angular.module('fitBuzz', ['schedulePickerModule', 'plotGeneratorModule']);

app.controller('FitBuzzController', ['$scope', function($scope) {
    $scope.username = "Ginelle Gaisano";
    $scope.showScheduler = true;
    $scope.signedIn = false;

    $scope.signIn = function() {
        $scope.signedIn = true;
        setTimeout(function () {
            $("#overlay").css("display", "none");
        }, 2000);
        $("input.timepicker").change();
    }

    $("#username-input").keyup(function(event){
        if(event.keyCode == 13){
        $("#signin-button").click();
    }
});
}]);
