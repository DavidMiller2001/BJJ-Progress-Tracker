"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { events } from "~/server/db/schema";
import EventView from "./EventView";

type eventType = typeof events.$inferSelect;

const EventList = ({ events }: { events: eventType[] }) => (
  <ul className="space-y-4">
    {events.map((event) => (
      <EventView key={event.id} event={event} />
    ))}
  </ul>
);

export default function UpcomingEvents(props: { allEvents: eventType[] }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const currentDate = new Date();
  const { allEvents } = props;

  const pastEvents = allEvents
    .filter((event) => new Date(event.eventDate) < currentDate)
    .sort(
      (a, b) =>
        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
    );

  const upcomingEvents = allEvents
    .filter((event) => new Date(event.eventDate) >= currentDate)
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>BJJ Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <EventList events={upcomingEvents} />
            ) : (
              <p>No upcoming events scheduled.</p>
            )}
          </TabsContent>
          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <EventList events={pastEvents} />
            ) : (
              <p>No past events recorded.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
