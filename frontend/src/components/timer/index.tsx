import { useTime } from "../../provider/timer-provider";
import { Button } from "../ui/button";
import { Clock } from "./clock";
import { ConfigurationBar } from "./configuration-bar";
import { SoundConfiguration } from "./sound-configuration";

export function Timer() {
  const { time, setTime } = useTime();

  return (
    <div className="w-full h-full flex flex-row overflow-hidden ">
      <div className="w-full h-full bg-background flex flex-col items-center justify-center">
        <SoundConfiguration />

        <div className="flex-1 flex items-center justify-center gap-4">
          <Clock />
        </div>
        <Button
          className="w-full min-h-12 h-12 text-foreground font-bold text-xl !bg-chart-1 hover:!bg-chart-1/60 cursor-pointer"
          variant={"outline"}
        >
          Start
        </Button>
      </div>
      <div className="w-80 h-full  bg-card overflow-y-scroll ">
        <ConfigurationBar />
      </div>
    </div>
  );
}
