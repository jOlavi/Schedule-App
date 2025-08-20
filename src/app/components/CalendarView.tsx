// components/CalendarView.tsx
"use client";

import { Calendar, Views } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css"; // Import custom styles
import { localizer } from "../lib/calendarSetup";

// Define formats for time display in the calendar
const formats = {
    timeGutterFormat: (date: Date, culture: string | undefined, localizer: any) =>
        format(date, "HH:mm"),
    eventTimeRangeFormat: (
        { start, end }: { start: Date; end: Date },
        culture: string | undefined,
        localizer: any
    ) => `${format(start, "HH:mm")} – ${format(end, "HH:mm")}`,
    agendaTimeFormat: (date: Date, culture: string | undefined, localizer: any) =>
        format(date, "HH:mm"),
};
const events = [
    {
        title: "Kokous",
        start: new Date(2025, 6, 22, 10, 0), // Huom: kuukausi 0-indeksoitu (6 = heinäkuu)
        end: new Date(2025, 6, 22, 11, 0),
    },
];

export default function CalendarView() {
    return (
        <div className="h-[80vh]">
            <Calendar
                scrollToTime={new Date(1970, 1, 1, 8, 0)} // Sets the initial scroll position to 8:00 AM
                localizer={localizer}
                events={events}
                defaultView={Views.WEEK}
                views={["month", "week", "day"]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                formats={formats}
            />
        </div>
    );
}
