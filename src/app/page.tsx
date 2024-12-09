import FormDialog from "~/components/FormDialog";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getEvents } from "~/server/actions";
import { events } from "~/server/db/schema";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center p-8">
      <div className="w-screen max-w-lg">
        <EventList />
        <FormDialog />
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
        <ul className="space-y-8">
          {events.map((event) => (
            <li key={`${event.id}`}>
              <EventView event={event} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

type EventType = typeof events.$inferInsert;

function EventView(props: { event: EventType }) {
  const { event } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{event.content}</p>
        <p>{`${event.eventDate}`}</p>
      </CardContent>
    </Card>
  );
}
