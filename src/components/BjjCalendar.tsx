"use client";

import { useState } from "react";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { format } from "date-fns";
import FormDialog from "./FormDialog";
import { events } from "~/server/db/schema";
import EventView from "./EventView";
import { useUser } from "@clerk/nextjs";

type Event = typeof events.$inferSelect;

export default function BjjCalendar(props: { allEvents: Event[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const events = props.allEvents;
  const selectedDaysEvents = events.filter(
    (event) => event.eventDate.getTime() === selectedDate?.getTime(),
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-2xl font-semibold">BJJ Calendar</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiersStyles={{
            training: { backgroundColor: "rgba(34, 197, 94, 0.1)" },
            competition: { backgroundColor: "rgba(249, 115, 22, 0.1)" },
          }}
          styles={{
            day: {
              width: "100%",
              height: "100%",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            month: { height: "100%" },
            caption: { fontSize: "1.2rem", marginBottom: "0.5rem" },
            nav_button_previous: { width: "2rem", height: "2rem" },
            nav_button_next: { width: "2rem", height: "2rem" },
            head_cell: { padding: "0.5rem 0", fontSize: "0.875rem" },
          }}
        />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Select a date"}
            </h3>
            {selectedDaysEvents.length > 0 ? (
              <ul>
                {selectedDaysEvents.map((event) => (
                  <div key={event.id}>
                    <EventView event={event} />
                  </div>
                ))}
              </ul>
            ) : (
              <p>No events scheduled for this date.</p>
            )}
          </div>

          <FormDialog selectedDate={selectedDate ?? new Date()} />
        </div>
      </div>
    </div>
  );
}
