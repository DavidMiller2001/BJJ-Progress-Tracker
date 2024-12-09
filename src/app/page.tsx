import BjjCalendar from "~/components/BjjCalendar";
import UpcomingEvents from "~/components/UpcomingEvents";
import { getEvents } from "~/server/actions";

export default async function HomePage() {
  const events = await getEvents();
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">BJJ Progress Tracker</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BjjCalendar />
        </div>
        <div className="space-y-6">
          <UpcomingEvents allEvents={events} />
        </div>
      </div>
    </div>
  );
}
