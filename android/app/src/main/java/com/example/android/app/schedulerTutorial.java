package com.example.android.app;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

public class schedulerTutorial extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scheduler_tutorial);

        int scheduleType = 1;
        TextView descriptionView = (TextView) findViewById(R.id.description);

        switch(scheduleType) {
            case 1:
                descriptionView.setText(getResources().getString(R.string.uberman_tutorial_content));
                break;
            case 2:
                descriptionView.setText(getResources().getString(R.string.everyman_tutorial_content));
                break;
            default:
                descriptionView.setText("Custom!");
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.scheduler_tutorial, menu);
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

    public void finishTutorial(View view) {
        Intent scheduler = new Intent(this, ubermanScheduler.class);
        startActivity(scheduler);
    }

}
