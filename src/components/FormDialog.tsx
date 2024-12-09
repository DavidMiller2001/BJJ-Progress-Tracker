"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import EventForm from "~/components/EventForm";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function FormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Add a new entry to the list of upcoming events.
          </DialogDescription>
        </DialogHeader>
        <EventForm closeDialog={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
