"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { events } from "~/server/db/schema";

type eventType = typeof events.$inferSelect;

const EventList = ({ events }: { events: eventType[] }) => (
  <ul className="space-y-4">
    {events.map((event) => (
      <li key={event.id} className="flex items-center">
        <div className="w-28">
          <Badge
            variant={event.type === "training" ? "secondary" : "destructive"}
          >
            {event.type === "training" ? "Training" : "Competition"}
          </Badge>
        </div>
        <div>
          <p className="font-semibold">
            {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <p>{event.type === "training" ? event.content : event.title}</p>
        </div>
      </li>
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
        <CardTitle>BJJ Events</CardTitle>
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
