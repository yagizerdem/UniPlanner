import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useLink } from "../../provider/link-provider";
import { LinksListView } from "./list-view";

export function Links() {
  const { setShowNewLinkPopup } = useLink();

  return (
    <div className="w-full h-full bg-background overflow-hidden flex flex-col">
      <div className="w-full h-fit bg-card p-4 cursor-pointer flex flex-row justify-between">
        <Button
          variant={"outline"}
          className="!bg-chart-1 hover:!bg-chart-1/90 cursor-pointer "
          onMouseUp={() => setShowNewLinkPopup(true)}
        >
          <span>New Link</span>
          <PlusIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <LinksListView />
    </div>
  );
}
