import {
  BookIcon,
  ClockIcon,
  HomeIcon,
  MailIcon,
  NotebookIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

export function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div className="w-56 h-full bg-card flex flex-col gap-2 py-4">
      <Button
        className="w-3/4 mx-auto cursor-pointer"
        variant={"outline"}
        onMouseUp={() => navigate("/")}
      >
        Home <HomeIcon />
      </Button>
      <Button
        className="w-3/4 mx-auto cursor-pointer"
        variant={"outline"}
        onMouseUp={() => navigate("/timer")}
      >
        Timer <ClockIcon />
      </Button>
      <Button
        className="w-3/4 mx-auto cursor-pointer"
        variant={"outline"}
        onMouseUp={() => navigate("/notes")}
      >
        Notes <NotebookIcon />
      </Button>
      <Button className="w-3/4 mx-auto cursor-pointer" variant={"outline"}>
        Study Material <BookIcon />
      </Button>
      <Button className="w-3/4 mx-auto cursor-pointer" variant={"outline"}>
        Events <MailIcon />
      </Button>
      <Button className="w-3/4 mx-auto cursor-pointer" variant={"outline"}>
        Settings <SettingsIcon />
      </Button>
    </div>
  );
}
