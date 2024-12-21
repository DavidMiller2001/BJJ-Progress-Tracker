"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import NewEventForm from "~/components/NewEventForm";
import UpdateEventForm from "./UpdateEventForm";
import { Event } from "~/server/db/schema";

function FormDialog(props: {
  formType: "create" | "update";
  event: Event | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          {props.formType === "create" && "New Event"}
          {props.formType === "update" && "Update Event"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.formType === "create" && "Create New Event"}
            {props.formType === "update" && "Update Existing Event"}
          </DialogTitle>
          <DialogDescription>
            {props.formType === "create" &&
              "Add a new entry to the list of upcoming events."}
          </DialogDescription>
        </DialogHeader>
        {props.formType === "create" && (
          <NewEventForm closeDialog={setIsOpen} />
        )}
        {props.formType === "update" && props.event !== null && (
          <UpdateEventForm closeDialog={setIsOpen} event={props.event} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function DialogForCreateForm() {
  return <FormDialog formType="create" event={null} />;
}

export function DialogForUpdateForm(props: { event: Event }) {
  return <FormDialog formType="update" event={props.event} />;
}
