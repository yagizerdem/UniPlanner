import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNote } from "../../provider/note-provider";

export function Header() {
  const { setShowNewNotePopup } = useNote();

  return (
    <div className="w-full h-fit bg-card p-4 cursor-pointer">
      <Button
        variant={"outline"}
        className="!bg-chart-1 hover:!bg-chart-1/90 cursor-pointer "
        onMouseUp={() => setShowNewNotePopup(true)}
      >
        <span>New Note</span>
        <PlusIcon className="ml-1 h-4 w-4" />
      </Button>
      <div className="relative w-full h-full flex flex-row items-center justify-between align-middle"></div>
    </div>
  );
}
