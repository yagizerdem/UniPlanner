import { useTime } from "../../provider/timer-provider";
import { ChevronUp, ChevronDown } from "lucide-react";
import moment from "moment";

export function Clock() {
  const { time, setTime } = useTime();

  const totalHours = Math.floor(time.asHours()).toString().padStart(2, "0");
  const minutes = time.minutes().toString().padStart(2, "0");
  const seconds = time.seconds().toString().padStart(2, "0");

  return (
    <div className="flex flex-row items-center justify-center align-middle">
      <div className="w-fit h-fit font-bold text-foreground text-6xl items-center justify-center align-middle flex flex-col select-none">
        <ChevronUp
          className="cursor-pointer "
          size={40}
          onMouseUp={() =>
            setTime((prev) => {
              const newTime = prev.clone();
              newTime.add({ hours: 1 });
              return newTime;
            })
          }
        />
        <span>{totalHours}</span>
        <ChevronDown
          className="cursor-pointer"
          size={40}
          onMouseUp={() =>
            setTime((prev) => {
              if (prev.asHours() <= 1) {
                return moment.duration(0, "milliseconds");
              }
              const newTime = prev.clone();
              newTime.subtract({ hours: 1 });
              return newTime;
            })
          }
        />
      </div>
      <div className="w-fit h-fit font-bold text-foreground text-6xl items-center justify-center align-middle flex flex-col select-none">
        :
      </div>
      <div className="w-fit h-fit font-bold text-foreground text-6xl items-center justify-center align-middle flex flex-col select-none">
        <ChevronUp
          className="cursor-pointer"
          size={40}
          onMouseUp={() =>
            setTime((prev) => {
              const newTime = prev.clone();

              newTime.add({ minutes: 1 });
              return newTime;
            })
          }
        />
        <span>{minutes}</span>
        <ChevronDown
          className="cursor-pointer"
          size={40}
          onMouseUp={() =>
            setTime((prev) => {
              if (prev.asMinutes() <= 1) {
                return moment.duration(0, "milliseconds");
              }
              const newTime = prev.clone();
              newTime.subtract({ minutes: 1 });
              return newTime;
            })
          }
        />
      </div>
      <div className="w-fit h-fit font-bold text-foreground text-6xl items-center justify-center align-middle flex flex-col select-none">
        :
      </div>
      <div className="w-fit h-fit font-bold text-foreground text-6xl items-center justify-center align-middle flex flex-col select-none">
        <ChevronUp
          className="cursor-pointer"
          size={40}
          onMouseUp={() =>
            setTime((prev) => {
              const newTime = prev.clone();
              newTime.add({ seconds: 1 });
              return newTime;
            })
          }
        />
        <span>{seconds}</span>
        <ChevronDown
          className="cursor-pointer"
          size={40}
          onMouseUp={() =>
            setTime((prev) => {
              if (prev.asSeconds() <= 1) {
                return moment.duration(0, "milliseconds");
              }
              const newTime = prev.clone();
              newTime.subtract({ seconds: 1 });
              return newTime;
            })
          }
        />
      </div>
    </div>
  );
}
