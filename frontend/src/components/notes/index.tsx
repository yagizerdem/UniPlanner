import { useState } from "react";
import { NotesListView } from "./listview";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNote } from "../../provider/note-provider";
import type { ApiResponse } from "../../../../shared/models/ApiResponse";
import { toast } from "sonner";
import { flash } from "../../util/flash";

export function Notes() {
  const { setShowNewNotePopup, notes } = useNote();
  const [modified, setModified] = useState(false);

  async function saveNotes() {
    const response: ApiResponse<void> =
      await window.noteController.saveNotes(notes);

    if (response.ok) {
      toast.success("Notes saved successfully.", {
        duration: 2000,
        position: "top-right",
      });
      setModified(false);
      flash({ duration: 1000, fadeOut: 500, initialOpacity: 0.7 });
    } else {
      toast.error(response.message || "Failed to save notes.", {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  return (
    <div className="w-full h-full bg-background overflow-hidden flex flex-col">
      <div className="w-full h-fit bg-card p-4 cursor-pointer flex flex-row justify-between">
        <Button
          variant={"outline"}
          className="!bg-chart-1 hover:!bg-chart-1/90 cursor-pointer "
          onMouseUp={() => setShowNewNotePopup(true)}
        >
          <span>New Note</span>
          <PlusIcon className="ml-1 h-4 w-4" />
        </Button>
        <Button
          variant={"outline"}
          className="!bg-chart-3/90 hover:!bg-chart-3/80 cursor-pointer "
          onMouseUp={() => saveNotes()}
          disabled={!modified}
        >
          <span>Save Changes</span>
          <PlusIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <NotesListView setModified={setModified} />
    </div>
  );
}
