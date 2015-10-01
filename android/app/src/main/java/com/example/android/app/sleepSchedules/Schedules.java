package com.example.android.app.sleepSchedules;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 * <p>
 * TODO: Replace all uses of this class before publishing your app.
 */
public class Schedules {

    /**
     * An array of sample (dummy) items.
     */
    public static List<ScheduleType> ITEMS = new ArrayList<ScheduleType>();

    /**
     * A map of sample (dummy) items, by ID.
     */
    public static Map<String, ScheduleType> ITEM_MAP = new HashMap<String, ScheduleType>();

    static {
        // Add 3 sample items.
        addItem(new ScheduleType("1", "Uberman"));
        addItem(new ScheduleType("2", "Everyman"));
        addItem(new ScheduleType("3", "Custom"));
    }

    private static void addItem(ScheduleType item) {
        ITEMS.add(item);
        ITEM_MAP.put(item.id, item);
    }

    /**
     * A dummy item representing a piece of content.
     */
    public static class ScheduleType {
        public String id;
        public String content;

        public ScheduleType(String id, String content) {
            this.id = id;
            this.content = content;
        }

        @Override
        public String toString() {
            return content;
        }
    }
}
