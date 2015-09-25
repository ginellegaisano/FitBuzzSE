// to start server, run python -m SimpleHTTPServer 8080 on command line	
// then navigate to http://localhost:8080/

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
    var endTime = (new Date()).setHours(23,59,59,999);

    var chart = d3.timeline();

    var uberData = [
        {times: [
            {"starting_time": startTime, "ending_time": endTime},
        ]},
    ];

    var testData = [
        {times: [
            {"color":"cornflowerblue", "starting_time": startTime, "ending_time": endTime},
        ]},
    ];


    chart.tickFormat({
      format: d3.time.format("%I:%M%p"),
      tickTime: d3.time.minutes,
      tickInterval: 15,
      tickSize: 6
    });

    chart.hover(function (d, i, datum) {
        console.log("hover");
    // d is the current rendering object
    // i is the index during d3 rendering
    });
    var svg = d3.select("#timeline1").append("svg").attr("width", 8000)
      .datum(testData).call(chart);
});
