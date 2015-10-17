/**
 * Created by rachel on 2015-09-25.
 */
/**
 * Created by rachel on 2015-09-23.
 */


function setup(){
    var client_id = "229W6K";
    var encoded_user_name = "MjI5VzZLOmU0MWU0NWU5MGE0YzUzZTEyNDc0NzljOWUwNzM4N2Fm="
    var refresh_token = "f90a3482e393666e631f0110fee382ac576703cfae08dcf8b8d934e03253626c";
    var access_token;
    var redirect_url = "http%3A%2F%2Flocalhost%3A63342";
    var tracking_id;
    var devices_ret_data;
    var alarm_ret_data;
    var sleep_ret_data = [];
    var heart_ret_data =[];
    var has_alarms = true;

    var fitbitAPI = function(){
         ajaxGETCall = function (url, type, authorization,onSuccess, onError, onComplete){
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
         ajaxPOSTCall = function (url, type, data, authorization,onSuccess, onError, onComplete){
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
         getDevices = function(){
            url =  "https://api.fitbit.com/1/user/-/devices.json";
            type= "GET";
            authorization = "Bearer " + access_token;
            onSuccess= function(data){
                console.log("getting Devices");
                device_ret_data = data;
                console.log(device_ret_data);
                tracking_id = data[0].id;

            }
            onError= function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            }
            onComplete = function(){
                //console.log("finished getting devices")
                getAlarms();
                setSleepTime("2015-09-01")
                setHeartTime("today", "1d")
            }

            ajaxGETCall (url, type, authorization, onSuccess, onError, onComplete );

        }
        getAlarms = function(){
            url =  "https://api.fitbit.com/1/user/-/devices/tracker/"+tracking_id+"/alarms.json";
            type= "GET";
            authorization = "Bearer " + access_token;
            onSuccess= function(data){
                console.log("got alarms");
                alarm_ret_data = data.trackerAlarms;
                if(data.trackerAlarms.length < 1){
                    has_alarms = false;
                }
                console.log(data.trackerAlarms);
            }
            onError= function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            }
            onComplete = function(){
                //console.log ("Get Devices Has Failed");
            }

            ajaxGETCall (url, type, authorization, onSuccess, onError, onComplete );

        }
        setSleepTime =  function(date){
            $.getJSON("fitbitapi/js/mockSleep.json", function(data) {
                $.each(data, function(idx, obj){
                    sleep_ret_data.push(obj);
                });
            });
            //url= "https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/" + date+ "/today.json";
            //type = "GET";
            //authorization = "Bearer " + access_token;
            //onSuccess = function(data){
            //    sleep_ret_data = data;
            //    return data;
            //}
            //onError= function (jqXHR, textStatus, errorThrown) {
            //    console.log(jqXHR)
            //}
            //onComplete = function(){
            //}
            //
            //ajaxGETCall(url, type, authorization, onSuccess, onError, onComplete);
        };

        //has to be in yyyy-MM-dd time. to current
        setHeartTime= function(date, period){
            $.getJSON("fitBitAPI/js/mockHeart.json", function(data){
                $.each(data, function(idx, obj){
                    heart_ret_data.push(obj);
                });
            })
            //url = "https://api.fitbit.com/1/user/-/activities/heart/date/" + date + "/" + period + ".json";
            //type = "GET";
            //authorization = "Bearer " + access_token;
            //onSuccess = function(data){
            //    heart_ret_data = data;
            //}
            //onError= function (jqXHR, textStatus, errorThrown) {
            //    console.log(jqXHR)
            //}
            //onComplete = function(){
            //}
            //ajaxGETCall(url, type, authorization, onSuccess, onError, onComplete);
        }

    };
    _.extend(fitbitAPI.prototype, {
        //functions of fitbit API!

        getAccessCode :  function(callback){
            code = window.location.search.substring(6)
            data = "client_id=229W6K&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A63342&code="+ code;
            url= "https://api.fitbit.com/oauth2/token"
            type= "POST"
            data= data
            authorization =  "Basic MjI5VzZLOmU0MWU0NWU5MGE0YzUzZTEyNDc0NzljOWUwNzM4N2Fm="
            success= function (data) {
                console.log("successfully got the code.")
                access_token = data.access_token;
                console.log(data.access_token);
                return true;
            }
            error= function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
                callback(true);
            }
            complete= function(){
                getDevices();
            }
            ajaxPOSTCall(url,type,data,authorization,success,error,complete)
        },

        setAlarm: function(time, day){
            var array = [day];
            if(has_alarms){
                var url = "https://api.fitbit.com/1/user/-/devices/tracker/"+device_ret_data[0].id + "/alarms/" + alarm_ret_data[0].alarmId + ".json"
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
                alarm_ret_data = data;
            }
            error= function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR)
            }
            complete  = function(){}
            ajaxPOSTCall(url,type,data,authorization,success,error,complete)

        },

        setSleepLogTimeFrame: function (date){
            setSleepTime(date);
        },

        setHeartRateLogTimeFrame: function(date, period){
            setHeartTime(date,period);
        },

        getAlarms: function(){
            return alarm_ret_data;
        },

        getDevice: function(){
            return devices_ret_data;
        },

        getSleepLogs: function(){
            return sleep_ret_data;
        },

        getHeartLogs: function(){
            return heart_ret_data;
        }
    })
    return {
        fitbitAPI: fitbitAPI,
    };
}




//TODO: delete alarm, save the alarm somewhere

//https://api.fitbit.com/1/user/-/devices/tracker/43035272/alarms.json 401 (Unauthorized)