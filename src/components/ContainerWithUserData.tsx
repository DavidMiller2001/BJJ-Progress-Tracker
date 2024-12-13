"use client";

import { events } from "~/server/db/schema";
import BjjCalendar from "./BjjCalendar";
import UpcomingEvents from "./UpcomingEvents";
import { useUser } from "@clerk/nextjs";

type Event = typeof events.$inferSelect;

export default function Container(props: { events: Event[] }) {
  const { events } = props;
  const { user } = useUser();

  let userEvents = new Array<(typeof events)[number]>();
  if (user) {
    userEvents = events.filter((event) => event.authorId === user.id);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <BjjCalendar allEvents={userEvents} />
      </div>
      <div className="space-y-6">
        <UpcomingEvents allEvents={userEvents} />
      </div>
    </div>
  );
}
