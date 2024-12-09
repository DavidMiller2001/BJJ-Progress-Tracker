import BjjCalendar from "~/components/BjjCalendar";
import FormDialog from "~/components/FormDialog";
import TrainingSessionForm from "~/components/TrainingSessionForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import UpcomingEvents from "~/components/UpcomingEvents";
import { getEvents } from "~/server/actions";
import { events } from "~/server/db/schema";

export default function HomePage() {
  return (
    // <main className="flex items-center justify-center p-8">
    //   <div className="w-screen max-w-lg">
    //     <EventList />
    //     <FormDialog />
    //   </div>
    // </main>
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">BJJ Progress Tracker</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BjjCalendar />
        </div>
        <div className="space-y-6">
          <TrainingSessionForm />
          <UpcomingEvents />
        </div>
      </div>
    </div>
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
  let formattedDate;
  if (event.eventDate) {
    formattedDate = event.eventDate.toDateString();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{event.content}</p>
        <p>{`${formattedDate}`}</p>
      </CardContent>
    </Card>
  );
}
