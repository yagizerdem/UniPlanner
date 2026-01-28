import { Fragment } from "react/jsx-runtime";
import { useNote } from "../../provider/note-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { ApiResponse } from "../../../../shared/models/ApiResponse";
import { toast } from "sonner";
import { memo } from "react";
import type { Note } from "../../../../shared/models/Note";

interface NotesListViewProps {
  setModified: (modified: boolean) => void;
}

export function NotesListView({ setModified }: NotesListViewProps) {
  const { notes } = useNote();
  return (
    <div className="w-full h-full  overflow-y-auto px-3">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} setModified={setModified} />
      ))}
    </div>
  );
}

const NoteItem = memo(function NoteItem({
  note,
  setModified,
}: {
  note: Note;
  setModified: (modified: boolean) => void;
}) {
  const { notes, setNotes } = useNote();

  async function handleDelete(noteId: string) {
    const filterdNotes = notes.filter((note) => note.id !== noteId);
    const result: ApiResponse<void> =
      await window.noteController.saveNotes(filterdNotes);

    if (result.ok) {
      setNotes(filterdNotes);

      toast.success("Note deleted successfully.", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error(result.message || "Failed to delete the note.", {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  return (
    <Fragment key={note.id}>
      <Accordion
        type="single"
        collapsible
        defaultChecked={false}
        className="border-b-2 pb-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            <Label className="font-bold text-xl select-none ">
              {note.title}
            </Label>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <Textarea
                onChange={(e) => {
                  const updatedNotes = notes.map((n) =>
                    n.id === note.id ? { ...n, content: e.target.value } : n,
                  );

                  setNotes(updatedNotes);
                  setModified(true);
                }}
              >
                {note.content}
              </Textarea>
              <div className="flex flex-row items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="mt-2 cursor-pointer"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this note?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row  gap-4 py-4">
                      <Button
                        variant="destructive"
                        className="cursor-pointer"
                        onMouseUp={() => handleDelete(note.id)}
                      >
                        Yes, Delete
                      </Button>
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={note.completed}
                    onChange={(e) => {
                      setNotes((prev) =>
                        prev.map((n) =>
                          n.id === note.id
                            ? { ...n, completed: e.target.checked }
                            : n,
                        ),
                      );
                      setModified(true);
                    }}
                  />

                  <div
                    className="
      w-6 h-6 rounded-md
      border border-muted-foreground
      flex items-center justify-center
      transition-all
      peer-checked:bg-primary
      peer-checked:border-primary
    "
                  >
                    <svg
                      className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
});
