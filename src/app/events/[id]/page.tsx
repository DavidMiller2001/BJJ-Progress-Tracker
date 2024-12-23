import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { capitalize, cn } from "~/lib/utils";
import { Event } from "~/server/db/schema";
import { getEventById } from "~/server/queries";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const selectedEvent = await getEventById(id);

  if (!selectedEvent) {
    return <div>404 Page not found</div>;
  }

  return <ExpandedEventView event={selectedEvent} />;
}

function ExpandedEventView(props: { event: Event }) {
  const { event } = props;
  const badgeText = capitalize(event.type);
  return (
    <Card className="shrink-0 basis-[500px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>
            {event.eventDate.toLocaleDateString()}
          </CardDescription>
        </div>
        <div className="margin-0 flex items-center justify-center">
          <Badge
            variant={"destructive"}
            className={cn("m-0 text-lg font-semibold")}
          >
            Competition
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>{event.content}</p>
      </CardContent>
    </Card>
  );
}
