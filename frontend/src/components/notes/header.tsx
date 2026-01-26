import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

export function Header() {
  return (
    <div className="w-full h-fit bg-card p-4 cursor-pointer">
      <Button
        variant={"outline"}
        className="!bg-chart-1 hover:!bg-chart-1/90 cursor-pointer "
      >
        <span>New Note</span>
        <PlusIcon className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
