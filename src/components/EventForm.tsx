"use client";

import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { createEvent } from "~/server/actions";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { events } from "~/server/db/schema";

type EventTypes = (typeof events.type.enumValues)[number];
const eventTypes = events.type.enumValues;

export const formSchema = z.object({
  title: z.string().min(1, { message: "Event name cannot be empty!" }),
  content: z.string().min(1, { message: "Event content cannot be empty!" }),
  date: z.date({ required_error: "An event date is required!" }),
  type: z.custom<EventTypes>(),
});

export default function EventForm(props: {
  closeDialog: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date;
}) {
  const { closeDialog } = props;
  const user = useUser();
  let id = "-1";
  if (user.isSignedIn) {
    id = user.user.id;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Test Title",
      content: "Test Content",
      date: props.selectedDate,
      type: "training",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    closeDialog(false);
    console.log(values);
    await createEvent(id, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Description of the event" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DatePicker(props: {
  field: ControllerRenderProps<z.infer<typeof formSchema>, "date">;
}) {
  const { field } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
