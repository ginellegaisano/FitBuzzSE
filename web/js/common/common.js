/*
Common helper functions.
*/


TimeEnum = {
    HOURS : 0,
    MINUTES : 1,
    SECONDS : 2
}

// converts time from hours/minutes/seconds to milliseconds
function convertTimeToMilliseconds (time, convertToType) {
    switch(convertToType) {
        case TimeEnum.HOURS:
            return time * 60 * 60 * 1000;
            break;
        case TimeEnum.MINUTES:
            return time * 60 * 1000;
            break;
        case TimeEnum.SECONDS:
            return time * 1000;
            break;
        default:
            // TODO(ginellegaisano): add real error handling
            return -1;
            console.log('Invalid type');
            break;
    }
}

function padZeroes(num, length) {
    var str = num.toString();
    while (str.length < length) str = "0" + str;
    return str;
}

function formatTime(hours, minutes) {
    return padZeroes(hours, 2) + ":" + padZeroes(minutes, 2);
}
