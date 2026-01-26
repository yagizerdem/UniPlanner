import moment from "moment";
import { Button } from "../ui/button";
import { useTime } from "../../provider/timer-provider";

export function ConfigurationBar() {
  const { time, setTime } = useTime();

  function updateTime(ms: number) {
    setTime((prev) => {
      const newTime = prev.clone();
      newTime.add({ milliseconds: ms });
      return newTime;
    });
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-2 p-4 select-none">
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(30 * 1000)}
        >
          30 Second
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(60 * 1000)}
        >
          1 Minute
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(5 * 60 * 1000)}
        >
          5 Minute
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(10 * 60 * 1000)}
        >
          10 Minute
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(30 * 60 * 1000)}
        >
          30 Minute
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(45 * 60 * 1000)}
        >
          45 Minute
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(60 * 60 * 1000)}
        >
          1 Hour
        </Button>
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(2 * 60 * 60 * 1000)}
        >
          2 Hour
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 p-4 py-0 select-none">
        <Button
          className="bg-chart-2 cursor-pointer"
          onMouseUp={() => updateTime(3 * 60 * 60 * 1000)}
        >
          3 Hour
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 p-4 py-4 select-none">
        <Button
          className="font-bold text-foreground cursor-pointer hover:scale-105 transition-all w-full"
          variant={"destructive"}
          onMouseUp={() =>
            setTime((_) => {
              return moment.duration(0, "milliseconds");
            })
          }
        >
          Clear Timer
        </Button>
        <Button
          className="font-bold text-background cursor-pointer hover:scale-105 transition-all w-full !bg-warning hover:text-background  "
          variant={"outline"}
          onMouseUp={() =>
            setTime((_) => {
              return moment.duration(0, "milliseconds");
            })
          }
        >
          Pause Timer
        </Button>

        <Button
          className="font-bold text-background cursor-pointer hover:scale-105 transition-all w-full !bg-chart-2 hover:text-background  "
          variant={"outline"}
          onMouseUp={() =>
            setTime((_) => {
              return moment.duration(0, "milliseconds");
            })
          }
        >
          Continue
        </Button>
      </div>
      <br />
      <hr />
      <div>Clock Type</div>
      <hr />
      <div className="grid grid-cols-1 gap-2 p-4 py-4 select-none">
        <Button
          variant="outline"
          className="w-full font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
        >
          Chronometer
        </Button>
        <Button
          variant="outline"
          className="w-full font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
        >
          Count Down
        </Button>
        <Button
          variant="outline"
          className="w-full font-bold text-foreground cursor-pointer transition-colors !bg-chart-1 hover:!bg-chart-1/40"
        >
          Pomodoro
        </Button>
      </div>
    </div>
  );
}
