import { SignedIn, SignedOut } from "@clerk/nextjs";
import BjjCalendar from "~/components/BjjCalendar";
import UpcomingEvents from "~/components/UpcomingEvents";
import { getEventsForUser } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const events = await getEventsForUser();

  return (
    <>
      <SignedOut>
        <div className="flex h-[80vh] w-full items-center justify-center">
          <h1 className="text-xl font-bold">Please Sign In Above!</h1>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto w-full max-w-3xl p-4">
          {events && (
            <div className="grid grid-cols-1 gap-6">
              <BjjCalendar allEvents={events} />
              <UpcomingEvents allEvents={events} />
            </div>
          )}
        </div>
      </SignedIn>
    </>
  );
}
