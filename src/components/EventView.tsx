import { Event } from "~/server/db/schema";
import { Badge } from "./ui/badge";
import { deleteEvent } from "~/server/actions";
import { CircleX } from "lucide-react";
import { DialogForUpdateForm } from "./FormDialog";
import Link from "next/link";
import { capitalize } from "~/lib/utils";

export default function EventView(props: { event: Event }) {
  const { event } = props;

  const badgeText = capitalize(event.type);

  return (
    <li key={event.id}>
      <div className="flex w-full items-center justify-between rounded-md border p-4">
        <div className="flex items-center">
          <div className="w-28">
            <Badge
              variant={
                event.type === "training"
                  ? "default"
                  : event.type === "competition"
                    ? "destructive"
                    : event.type === "promotion"
                      ? "secondary"
                      : undefined
              }
            >
              {`${badgeText}`}
            </Badge>
          </div>
          <div>
            <p className="font-semibold">
              {event.eventDate.toLocaleDateString()}
            </p>
            <Link href={`/events/${event.id}`}>
              <p>{event.title}</p>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <DialogForUpdateForm event={event} />
          <form
            className="flex items-center"
            action={async () => {
              await deleteEvent(event.id);
            }}
          >
            <button type="submit">
              <CircleX />
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}
