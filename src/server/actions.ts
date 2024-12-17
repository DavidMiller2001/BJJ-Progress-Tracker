"use server";

import { formSchema } from "~/components/EventForm";
import { events } from "./db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

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
