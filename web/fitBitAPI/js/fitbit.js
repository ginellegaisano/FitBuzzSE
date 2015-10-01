/**
 * Created by rachel on 2015-09-25.
 */
var array =  [];
//sets alarm for 3 minutes after current time.
$("#setAlarm").click(function(){
    var currentdate = new Date();
    var newdate = new Date (currentdate.getTime() + 3*60000)
    var time =  newdate.getHours() + ":"
        + newdate.getMinutes();
    fitbitAPI.setAlarm(time, 'FRIDAY');
})

$("#getSleep").click(function(){
    console.log(fitbitAPI.getSleepLogs());
})

$("#getHeart").click(function(){
    console.log(fitbitAPI.getHeartLogs());
})
var stup = setup();
var fitbitAPI = new stup.fitbitAPI();

$(document).ready(function(){
    console.log("document ready")
    fitbitAPI.getAccessCode(function(data){
        console.log("getting Access code");
        if(data){
            console.log("reloading page");
            window.location="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=229W6K&redirect_uri=http%3A%2F%2Flocalhost%3A63342%2FFitBuzzSE%2Fweb%2FfitBitAPI%2Fmain.html&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight"
        }
        console.log("got access code");
    });

    //we put this into the onload function. (ONLY RUN ONCE)
    //TODO: add server to store code. instead of just parsing it.
    //TODO: add some sort of server to perform data analytics.
    //if(test)
})

