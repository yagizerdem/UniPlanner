import { Button } from "../../components/ui/button";
import { MaximizeIcon, MinimizeIcon, XIcon } from "lucide-react";

export function Header() {
  return (
    <div className="w-full h-12 bg-card flex flex-row items-center drag justify-end gap-2 px-4">
      <Button variant={"default"} className="no-drag cursor-pointer">
        <MinimizeIcon size={16} />
      </Button>
      <Button variant={"default"} className="no-drag cursor-pointer">
        <MaximizeIcon size={16} />
      </Button>
      <Button variant={"destructive"} className="no-drag cursor-pointer">
        <XIcon size={16} />
      </Button>
    </div>
  );
}
