/**
 * Created by rachel on 2015-09-25.
 */
/**
 * Created by rachel on 2015-09-23.
 */


function setup(){
    var client_id = "229W6K";
    var encoded_user_name = "MjI5VzZLOmU0MWU0NWU5MGE0YzUzZTEyNDc0NzljOWUwNzM4N2Fm="
    var access_token;
    var redirect_url = "http%3A%2F%2Flocalhost%3A63342%2FFitBuzzSE%2Fweb%2FfitBitAPI%2Fmain.html";
    var tracking_id;
    var devices_ret_data;
    var alarm_ret_data;
    var has_alarms;
    var ajaxGETCall = function (url, type, authorization,onSuccess, onError, onComplete){
        $.ajax({
            url: url,
            type: type,

            dataType: "json",
            cache: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", authorization);
            },
            success: function(data) {
                onSuccess(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                onError(jqXHR, textStatus, errorThrown);
            },
            complete:function(){
                onComplete();
            }
        })
    };
    var ajaxPOSTCall = function (url, type, data, authorization,onSuccess, onError, onComplete){
        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            data: data,
            cache: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", authorization);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            },
            success: function(data) {
                onSuccess(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                onError(jqXHR, textStatus, errorThrown);
            },
            complete: function(){
                onComplete();
            }
        })
    }
    var getDevices = function(){
        console.log("test");
        url =  "https://api.fitbit.com/1/user/-/devices.json";
        type= "GET";
        authorization = "Bearer " + access_token;
        onSuccess= function(data){
            console.log("getting Devices");
            console.log(data);
            device_ret_data = data;
            tracking_id = data[0].id;

        }
        onError= function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
        onComplete = function(){
            console.log("finished getting devices")
            getAlarms();
            //console.log ("Get Devices Has Failed");
        }

        ajaxGETCall (url, type, authorization, onSuccess, onError, onComplete );

    }
    var getAlarms = function(){
        url =  "https://api.fitbit.com/1/user/-/devices/tracker/"+tracking_id+"/alarms.json";
        type= "GET";
        authorization = "Bearer " + access_token;
        onSuccess= function(data){
            console.log("getting alarms");
            alarm_ret_data = data;
            console.log();;
            if(data.trackerAlarms.length){
                console.log("new Alarms!!");
                has_alarms = false;
            }
            console.log(data);
        }
        onError= function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
        onComplete = function(){
            //console.log ("Get Devices Has Failed");
        }

        ajaxGETCall (url, type, authorization, onSuccess, onError, onComplete );

    }
    var fitbitAPI = function(){
    };
    _.extend(fitbitAPI.prototype, {
        //functions of fitbit API!

        getAccessCode :  function(){
            code = window.location.search.substring(6)
            data = "client_id=229W6K&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A63342%2FFitBuzzSE%2Fweb%2FfitBitAPI%2Fmain.html&code="+ code;
            url= "https://api.fitbit.com/oauth2/token"
            type= "POST"
            data= data
            authorization =  "Basic MjI5VzZLOmU0MWU0NWU5MGE0YzUzZTEyNDc0NzljOWUwNzM4N2Fm="
            success= function (data) {
                access_token = data.access_token;
                console.log("access_code obtained");
                //localstorage.setItem('response', Json.stringify(data));
            }
            error= function (jqXHR, textStatus, errorThrown) {
                console.log("yrdy")
            }
            complete= function(){
                getDevices();
                //console.log("test");
            }
            ajaxPOSTCall(url,type,data,authorization,success,error,complete)
        },


        setAlarm: function(time, day){
            //var a = new Date(timestamp*1000);
            //var days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
            //var dayOfWeek = days[a.getDay()]

            var array = [day];
            if(has_alarms){
                var url = "https://api.fitbit.com/1/user/-/devices/tracker/"+device_ret_data[0].id + "/alarms/" + alarm_ret_data[0].id + ".json"
                data = {time: time + '-04:00',
                    enabled:"true",
                    recurring:"false",
                    weekDays: array,
                    snoozeLength: 1,
                    snoozeCount: 9,
                    label: "FitBuzz Alarm!"
                }
            }else{
                var url = 'https://api.fitbit.com/1/user/-/devices/tracker/'+ device_ret_data[0].id + '/alarms.json'
                data = {time: time + '-04:00',
                    enabled:"true",
                    recurring:"false",
                    weekDays: array}
            }

            authorization = "Bearer " + access_token;
            type = "POST";
            success =  function(data) {
                console.log(data);
                alarm_ret_data = data;
            }
            error= function (jqXHR, textStatus, errorThrown) {
                    console.log("yrdy")
                    console.log(textStatus);
                    console.log(errorThrown);
            }
            complete  = function(){

            }
            ajaxPOSTCall(url,type,data,authorization,success,error,complete)

        },
    })
    return {
        fitbitAPI: fitbitAPI,
        access_token: access_token
    };
}




//TODO: update alarm, delete alarm, save the alarm somewhere

//https://api.fitbit.com/1/user/-/devices/tracker/43035272/alarms.json 401 (Unauthorized)