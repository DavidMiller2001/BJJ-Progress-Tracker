import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import BjjCalendar from "~/components/BjjCalendar";
import UpcomingEvents from "~/components/UpcomingEvents";
import { getEventsForUser } from "~/server/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await auth();

  const events = await getEventsForUser(user.userId ?? "");
  return (
    <>
      <SignedOut>
        <div className="flex h-[80vh] w-full items-center justify-center">
          <h1 className="text-xl font-bold">Please Sign In Above!</h1>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BjjCalendar allEvents={events} />
            </div>
            <div className="space-y-6">
              <UpcomingEvents allEvents={events} />
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
