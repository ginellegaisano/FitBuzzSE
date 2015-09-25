/*	Functions that calculate the different sleep schedules.
	Will include:
		Uberman
		Everyman
		Normal
		Make your own
	Dependent on common.js
*/


// Given a start time, in milliseconds (UNIX timestamp), outputs an array of 
// week's worth of sleep schedule (for d3-timeline).
function calculateUbermanWeeklySleepSchedule (startTime) {
	var times = [];
	for (i = 0; i < 6 * 7; i++) {
        times.push( {
            "color":"cornflowerblue", 
            "starting_time": startTime + convertTimeToMilliseconds(i * 4, TimeEnum.HOURS) + 
            	convertTimeToMilliseconds(i * 20, TimeEnum.MINUTES), 
            "ending_time": startTime + convertTimeToMilliseconds(i * 4, TimeEnum.HOURS) + 
            	convertTimeToMilliseconds((i + 1) * 20, TimeEnum.MINUTES), 
        });
    }
    return times;
}