import EventForm from "~/components/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { getEvents } from "~/server/actions";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center p-8">
      <div className="w-screen max-w-lg">
        <EventList />
        <EventForm />
      </div>
    </main>
  );
}

async function EventList() {
  const events = await getEvents();
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {events.map((event) => (
            <li key={`${event.id}`}>
              <h3>{event.title}</h3>
              <p>{event.content}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
