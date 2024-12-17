import { events } from "~/server/db/schema";
import { Badge } from "./ui/badge";

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
      <div className="w-28">
        <Badge
          variant={
            event.type === "training"
              ? "default"
              : event.type === "competition"
                ? "secondary"
                : event.type === "promotion"
                  ? "outline"
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
    </li>
  );
}
