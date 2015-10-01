package com.example.android.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TimePicker;

import java.util.Date;

public class ubermanScheduler extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_uberman_scheduler);
    }

    public void calculateSleepTimes(View view) {
        TimePicker timePicker = (TimePicker) findViewById(R.id.timePicker);

        int hour = timePicker.getCurrentHour();
        int minute = timePicker.getCurrentMinute();
        int baseline = timePicker.getBaseline();

        SleepPostData sleepPostData = new SleepPostData();
        Date napDate = new Date();
        //sleepPostData.postData(Date());
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.uberman_scheduler, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
