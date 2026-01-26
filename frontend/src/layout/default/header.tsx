import { Button } from "../../components/ui/button";
import { MaximizeIcon, MinimizeIcon, XIcon } from "lucide-react";

export function Header() {
  function handleMinimize() {
    window.windowController.minimize();
  }

  function handleMaximize() {
    window.windowController.maximize();
  }

  function handleClose() {
    window.windowController.close();
  }

  return (
    <div className="w-full h-12 py-4 bg-card flex flex-row items-center drag justify-end gap-2 px-4">
      <Button
        variant={"default"}
        className="no-drag cursor-pointer"
        onMouseUp={handleMinimize}
      >
        <MinimizeIcon size={16} />
      </Button>
      <Button
        variant={"default"}
        className="no-drag cursor-pointer"
        onMouseUp={handleMaximize}
      >
        <MaximizeIcon size={16} />
      </Button>
      <Button
        variant={"destructive"}
        className="no-drag cursor-pointer"
        onMouseUp={handleClose}
      >
        <XIcon size={16} />
      </Button>
    </div>
  );
}
