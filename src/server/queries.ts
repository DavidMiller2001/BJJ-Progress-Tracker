import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getEventsForUser() {
  const user = await auth();
  if (!user || !user.userId) {
    throw new Error("Unauthorized!");
  }
  const events = await db.query.events.findMany({
    where: (model, { eq }) => eq(model.authorId, user.userId),
  });
  return events;
}

export async function getEventById(id: number) {
  const user = await auth();
  if (!user || !user.userId) {
    throw new Error("Unauthorized!");
  }
  const event = await db.query.events.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  return event;
}
