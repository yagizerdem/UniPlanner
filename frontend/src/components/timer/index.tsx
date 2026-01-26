import { useTime } from "../../provider/timer-provider";

export function Timer() {
  const { time, setTime } = useTime();

  console.log(time);

  return <div></div>;
}
