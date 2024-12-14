import Container from "~/components/ContainerWithUserData";
import { getEvents } from "~/server/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const events = await getEvents();
  return (
    <div className="container mx-auto p-4">
      <Container events={events} />
    </div>
  );
}
