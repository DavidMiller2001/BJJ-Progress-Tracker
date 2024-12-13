"use server";

import { formSchema } from "~/components/EventForm";
import { db } from "./db";
import { events } from "./db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function createEvent(
  userId: string,
  formData: z.infer<typeof formSchema>,
) {
  await db.insert(events).values({
    title: formData.title,
    content: formData.content,
    authorId: userId,
    eventDate: formData.date,
    type: formData.type,
  });
  revalidatePath("/");
}

export async function getEvents() {
  const events = await db.query.events.findMany();
  return events;
}

// export async function getEventsForUser(userId: string) {
//   const events = await db.query.events.findMany({
//     where: (model, { eq }) => eq(model.authorId, userId),
//   });
//   return events;
// }
