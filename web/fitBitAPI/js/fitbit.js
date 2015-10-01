/**
 * Created by rachel on 2015-09-25.
 */

//sets alarm for 3 minutes after current time.
$("#setAlarm").click(function(){
    var currentdate = new Date();
    var newdate = new Date (currentdate.getTime() + 3*60000)
    var time =  newdate.getHours() + ":"
        + newdate.getMinutes();
    fitbitAPI.setAlarm(time, 'FRIDAY');
})

var stup = setup();
var fitbitAPI = new stup.fitbitAPI();

$("#redirect").click(function(){
    //we put this into the onload function. (ONLY RUN ONCE)
    //TODO: add php server to store code. instead of just parsing it.
    //TODO: add some sort of server to perform data analytics.
    window.location="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=229W6K&redirect_uri=http%3A%2F%2Flocalhost%3A63342%2FFitBuzzSE%2Fweb%2FfitBitAPI%2Fmain.html&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight"
})
$("#afterLogin").click(function(){
        fitbitAPI.getAccessCode()
    }
)
