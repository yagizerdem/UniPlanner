import { useTime } from "../../provider/timer-provider";

export function Timer() {
  const { time, setTime } = useTime();

  return <div>timer</div>;
}
