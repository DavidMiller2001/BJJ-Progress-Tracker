"use client";

import { useState } from "react";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";
import FormDialog from "./FormDialog";

// This would typically come from a database or API
const trainingSessions = [
  { id: 1, date: "2023-07-10", notes: "Worked on guard passes" },
  { id: 2, date: "2023-07-15", notes: "Drilled submissions from mount" },
];

const upcomingCompetitions = [
  { id: 1, name: "Local BJJ Open", date: "2023-08-15" },
  { id: 2, name: "State Championships", date: "2023-09-22" },
  { id: 3, name: "National Tournament", date: "2023-11-05" },
];

export default function BjjCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const trainingDates = trainingSessions.map(
    (session) => new Date(session.date),
  );
  const competitionDates = upcomingCompetitions.map(
    (comp) => new Date(comp.date),
  );

  const selectedTrainingSession = trainingSessions.find(
    (session) =>
      session.date === format(selectedDate || new Date(), "yyyy-MM-dd"),
  );

  const selectedCompetition = upcomingCompetitions.find(
    (comp) => comp.date === format(selectedDate || new Date(), "yyyy-MM-dd"),
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
          modifiers={{
            training: trainingDates,
            competition: competitionDates,
          }}
          modifiersStyles={{
            training: { backgroundColor: "rgba(34, 197, 94, 0.1)" },
            competition: { backgroundColor: "rgba(249, 115, 22, 0.1)" },
          }}
          styles={{
            // day_today: { fontWeight: 'bold' },
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
            {selectedTrainingSession && (
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  Training Session
                </Badge>
                <p>{selectedTrainingSession.notes}</p>
              </div>
            )}
            {selectedCompetition && (
              <div>
                <Badge variant="secondary" className="mb-2">
                  Competition
                </Badge>
                <p>{selectedCompetition.name}</p>
              </div>
            )}
            {!selectedTrainingSession && !selectedCompetition && (
              <p>No events scheduled for this date.</p>
            )}
          </div>
          <FormDialog />
        </div>
      </div>
    </div>
  );
}
