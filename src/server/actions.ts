import { formSchema } from "~/components/EventForm";
import { db } from "./db";
import { events } from "./db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
  redirect("/");
}

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
