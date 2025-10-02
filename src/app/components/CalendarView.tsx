// components/CalendarView.tsx
"use client";
import React, { useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css"; // Import custom styles
import { localizer } from "../lib/calendarSetup";
import AddEvent from "./AddEvent";

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

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    color: string;
};

export default function CalendarView() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [newEvent, setNewEvent] = useState<{ start: Date; end: Date } | null>(null);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState<string>("#62A388");
    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        setNewEvent({ start, end });
        setPopupOpen(true);
    };
    const handleAddEvent = () => {
        if (title && newEvent) {
            setEvents([...events, { ...newEvent, title, color }]);
            setPopupOpen(false);
            setTitle("");
            setNewEvent(null);
            setColor("#62A388");
        }
    };
    const setNewEventTime = (type: "start" | "end", hour: number, minute: number) => {
        setNewEvent((prev) => {
            if (!prev) return prev;
            const date = new Date(prev[type]);
            date.setHours(hour, minute, 0, 0);
            return { ...prev, [type]: date };
        });
    };
    return (
        <div className="h-[80vh]">
            <Calendar
                scrollToTime={new Date(1970, 1, 1, 8, 0)} // Sets the initial scroll position to 8:00 AM
                localizer={localizer}
                events={events}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.color,
                        borderRadius: "5px",
                        color: "white",
                        fontWeight: "bold",
                        letterSpacing: "0.6px",
                        fontSize: "1.1rem",
                    },
                })}
                defaultView={Views.DAY}
                views={["month", "week", "day"]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                formats={formats}
                onSelectSlot={handleSelectSlot}
                selectable
                onSelectEvent={(event) => {
                    // Tässä event on klikattu tapahtuma
                    console.log("Klikattu event:", event);
                    // Voit avata muokkaus-popupin, näyttää tiedot tms.
                }}
            />
            {popupOpen && (
                <AddEvent
                    title={title}
                    setTitle={setTitle}
                    setPopupOpen={setPopupOpen}
                    setNewEvent={setNewEvent}
                    newEvent={newEvent}
                    handleAddEvent={handleAddEvent}
                    setNewEventTime={setNewEventTime}
                    setColor={setColor}
                    color={color}
                    label="Add new Event"
                />
            )}
        </div>
    );
}
