"use client";

import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { format } from "date-fns";
import { DialogForCreateForm } from "./FormDialog";
import type { Event } from "~/server/db/schema";
import EventView from "./EventView";
import { selectedDateAtom } from "~/app/atoms";
import { useAtom } from "jotai";

export default function BjjCalendar(props: { allEvents: Event[] }) {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const events = props.allEvents;
  const competitions = events.filter((event) => event.type === 'competition').map((event) => new Date(event.eventDate))
  const trainingSessions = events.filter((event) => event.type === 'training').map((event) => new Date(event.eventDate))
  const selectedDaysEvents = events.filter(
    (event) => event.eventDate.getTime() === selectedDate?.getTime(),
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-2xl font-semibold">BJJ Calendar</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="hidden p-0 sm:block [&>*]:[&>*]:m-auto [&>*]:[&>*]:w-full [&>*]:rounded-md [&>*]:border [&>*]:p-4 [&_tr]:mx-[10%] [&_tr]:w-[80%]"
          modifiers={{
            competition: competitions,
            training: trainingSessions,
          }}
          modifiersStyles={{
            training: { backgroundColor: "#4f46e5", color: "white"},
            competition: { backgroundColor: "hsl(0 84.2% 60.2%)", color: "white" },
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
            month: {
              height: "100%",
            },
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

          <DialogForCreateForm />
        </div>
      </div>
    </div>
  );
}
