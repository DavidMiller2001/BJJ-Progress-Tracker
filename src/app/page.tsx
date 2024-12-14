import { SignedIn, SignedOut } from "@clerk/nextjs";
import Container from "~/components/ContainerWithUserData";
import { getEvents } from "~/server/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const events = await getEvents();
  return (
    <>
      <SignedOut>
        <div className="flex h-[80vh] w-full items-center justify-center">
          <h1 className="text-xl font-bold">Please Sign In Above!</h1>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto p-4">
          <Container events={events} />
        </div>
      </SignedIn>
    </>
  );
}
