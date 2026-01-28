import { Fragment } from "react/jsx-runtime";
import { Card } from "../../ui/card";
import { ChevronDownIcon, TrashIcon, XIcon } from "lucide-react";
import { useNote } from "../../../provider/note-provider";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { type Note } from "../../../../../shared/models/Note";
import { v4 as uuidv4 } from "uuid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { toast } from "sonner";
import type { ApiResponse } from "../../../../../shared/models/ApiResponse";
import { el } from "date-fns/locale";

export function NewNotePopup() {
  const { setShowNewNotePopup, setNotes, notes } = useNote();
  const cardRef = useRef<HTMLDivElement>(null);
  const [remainder, setRemainder] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: -10, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scale: 1,
          ease: "power2.out",
        },
      );
    }
  }, []);

  function onClose() {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          setShowNewNotePopup(false);
        },
      });
    }
  }

  async function handleSubmit() {
    if (title.trim() === "") {
      toast.error("Title cannot be empty", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    const newNote: Note = {
      completed: false,
      content: content,
      title: title,
      id: uuidv4(),
      createdAt: new Date(),
      remainder,
      updatedAt: new Date(),
    };
    const newNotes = [newNote, ...notes];

    const respnose: ApiResponse<void> =
      await window.noteController.saveNotes(newNotes);
    if (respnose.ok) {
      setNotes(newNotes);

      toast.success("Note created successfully", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error(respnose.message || "Failed to create the note.", {
        duration: 2000,
        position: "top-right",
      });
    }

    onClose();
  }

  return (
    <Fragment>
      <div className="absolute inset-0 top-0 left-0 w-full h-full flex flex-row items-center justify-between align-middlez-99">
        <div
          className="absolute inset-0 bg-black opacity-40 w-full h-full z-99 select-none"
          onMouseUp={() => onClose()}
        />
        <Card
          ref={cardRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-96 select-none  z-100"
        >
          <h2 className="text-2xl font-semibold  flex flex-row justify-end">
            <XIcon className="cursor-pointer" onMouseUp={() => onClose()} />
          </h2>
          <hr />
          <FieldGroup className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="input-title">Enter Title</FieldLabel>
              <Input
                id="input-title"
                type="text"
                placeholder="My First Note"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-content">Enter Content</FieldLabel>
              <Input
                id="input-content"
                type="text"
                placeholder="This is my first note content"
                onChange={(e) => setContent(e.currentTarget.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-content">
                Select Remainder Date{" "}
                <span className="text-sm text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <div className="flex flex-row w-fit items-center gap-4 ">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!remainder}
                      className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                    >
                      {remainder ? (
                        format(remainder, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={remainder ?? undefined}
                      onSelect={setRemainder}
                      defaultMonth={remainder ?? undefined}
                    />
                  </PopoverContent>
                </Popover>
                <TrashIcon
                  className="cursor-pointer"
                  onMouseUp={() => setRemainder(null)}
                />
              </div>
            </Field>
          </FieldGroup>
          <Button
            className="!bg-chart-2  hover:!bg-chart-2/60 transition-all duration-400 cursor-pointer"
            variant={"outline"}
            onMouseUp={() => handleSubmit()}
          >
            Submit
          </Button>
        </Card>
      </div>
    </Fragment>
  );
}
