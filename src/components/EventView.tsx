import { events } from "~/server/db/schema";
import { Badge } from "./ui/badge";

type eventType = typeof events.$inferSelect;

export default function EventView(props: { event: eventType }) {
  const { event } = props;
  return (
    <li key={event.id} className="flex items-center">
      <div className="w-28">
        <Badge
          variant={event.type === "training" ? "secondary" : "destructive"}
        >
          {event.type === "training" ? "Training" : "Competition"}
        </Badge>
      </div>
      <div>
        <p className="font-semibold">
          {new Date(event.eventDate).toLocaleDateString()}
        </p>
        <p>{event.title}</p>
      </div>
    </li>
  );
}
