"use server";

import { formSchema } from "~/components/NewEventForm";
import { events } from "./db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { and, eq } from "drizzle-orm";

export async function createEvent(formData: z.infer<typeof formSchema>) {
  const user = await auth();

  if (!user || !user.userId) {
    throw new Error("Unauthorized!");
  }

  await db.insert(events).values({
    title: formData.title,
    content: formData.content,
    authorId: user.userId,
    eventDate: formData.date,
    type: formData.type,
  });
  revalidatePath("/");
}

export async function deleteEvent(id: number) {
  const user = await auth();

  if (!user || !user.userId) {
    throw new Error("Unauthorized!");
  }

  const selectedEvent = await db.query.events.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!selectedEvent) {
    throw new Error(`Event with id: ${id} does not exist!`);
  }

  await db
    .delete(events)
    .where(and(eq(events.id, id), eq(events.authorId, user.userId)));

  revalidatePath("/");
}

export async function updateEvent(
  id: number,
  formData: z.infer<typeof formSchema>,
) {
  const user = await auth();

  if (!user || !user.userId) {
    throw new Error("Unauthorized!");
  }

  const selectedEvent = await db.query.events.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!selectedEvent) {
    throw new Error(`Event with id: ${id} does not exist!`);
  }

  await db
    .update(events)
    .set({
      title: formData.title,
      content: formData.content,
      authorId: user.userId,
      eventDate: formData.date,
      type: formData.type,
    })
    .where(and(eq(events.id, id), eq(events.authorId, user.userId)));

  revalidatePath("/");
}
