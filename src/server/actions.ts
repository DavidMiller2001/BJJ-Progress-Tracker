"use server";

import { formSchema } from "~/components/EventForm";
import { db } from "./db";
import { events } from "./db/schema";
import { z } from "zod";

export async function createEvent(
  userId: string,
  formData: z.infer<typeof formSchema>,
) {
  await db.insert(events).values({
    title: formData.title,
    content: formData.content,
    authorId: userId,
  });
}

export async function getEvents() {
  const events = await db.query.events.findMany();
  return events;
}
