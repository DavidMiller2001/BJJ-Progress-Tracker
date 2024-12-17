import { events } from "~/server/db/schema";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { deleteEvent } from "~/server/actions";
import { CircleX } from "lucide-react";

type eventType = typeof events.$inferSelect;

function capitalize(str: string) {
  const charArr = str.split("");
  charArr[0] = (charArr[0] ?? "").toUpperCase();
  let formattedStr = "";
  formattedStr = charArr.join("");
  return formattedStr;
}

export default function EventView(props: { event: eventType }) {
  const { event } = props;

  const badgeText = capitalize(event.type);

  return (
    <li key={event.id} className="flex items-center">
      <div className="flex w-full items-center justify-between">
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
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
            <p>{event.title}</p>
          </div>
        </div>
        <div>
          <form
            className="flex items-center"
            action={async () => {
              await deleteEvent(event.id);
            }}
          >
            <button type="submit">
              <CircleX size={30} />
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}
