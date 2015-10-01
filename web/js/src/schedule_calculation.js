/*
Functions that calculate different sleep schedules.

Include:
    Uberman
    Everyman
    Normal - TODO(ginellegaisano)
    Custom - TODO(ginellegaisano)

Dependencies:
    common.js
*/

/*
Returns an array of sleep times for Everyman sleep schedule (objects for d3-timeline).

Parameters:
    startTime: unix timestamp of when core sleep period (longest nap) should begin.
    [Optional] days: number of days for calculate sleep schedule for. Default is 1.
*/
function calculateEverymanSleepSchedule (startTime, days) {
    if (days === undefined) {
        days = 1;
    }
    var times = [];

    for (i = 0; i < 4 * days; i++) {
        if (i % 4 == 0) {
            // add longest nap
            times.push({
                "color":PRIMARY_COLOUR,
                "starting_time": startTime + convertTimeToMilliseconds(Math.floor(i / 4) * 24, TimeEnum.HOURS),
                "ending_time": startTime + convertTimeToMilliseconds(Math.floor(i / 4) * 24 + 3, TimeEnum.HOURS)
            });
        } else {
            times.push({
                "color":PRIMARY_COLOUR,
                "starting_time": startTime + convertTimeToMilliseconds(
                        Math.floor(i / 4) * 24 // number of days
                        + 3 // longest nap
                        + 5 * (i % 4), // (i % 4)th nap in the day
                        TimeEnum.HOURS) +
                        convertTimeToMilliseconds(((i - 1) % 4)* 20, TimeEnum.MINUTES),
                "ending_time": startTime +convertTimeToMilliseconds(
                        Math.floor(i / 4) * 24
                        + 3
                        + 5 * (i % 4),
                        TimeEnum.HOURS) +
                        convertTimeToMilliseconds((i % 4) * 20, TimeEnum.MINUTES),
            });
        }

    }
    return times;
}

/*
Returns an array of sleep times for Uberman sleep schedule (objects for d3-timeline).

Parameters:
    startTime: unix timestamp of when first nap should begin.
    [Optional] days: number of days for calculate sleep schedule for. Default is 1.
*/
function calculateUbermanSleepSchedule (startTime, days) {
    if (days === undefined) {
        days = 1;
    }
    var times = [];
    for (i = 0; i < 6 * days; i++) {
        times.push( {
            "color":PRIMARY_COLOUR,
            "starting_time": startTime + convertTimeToMilliseconds(i * 4, TimeEnum.HOURS) +
                convertTimeToMilliseconds(i * 20, TimeEnum.MINUTES),
            "ending_time": startTime + convertTimeToMilliseconds(i * 4, TimeEnum.HOURS) +
                convertTimeToMilliseconds((i + 1) * 20, TimeEnum.MINUTES),
        });
    }
    return times;
}
