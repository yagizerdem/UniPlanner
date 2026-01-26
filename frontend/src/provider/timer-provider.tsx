import type { Moment } from "moment";
import moment from "moment";
import { createContext, useContext, useState } from "react";

type TimerProviderProps = {
  children: React.ReactNode;
};

type TimerProviderState = {
  time: Moment;
  setTime: (time: Moment) => void;
};

const initialState: TimerProviderState = {
  time: moment().add(0, "milliseconds"),
  setTime: () => null,
};

const TimerProviderContext = createContext<TimerProviderState>(initialState);

export function TimerProvider({ children, ...props }: TimerProviderProps) {
  const [time, setTime] = useState<Moment>(moment().add(0, "milliseconds"));

  const value = {
    time,
    setTime,
  };

  return (
    <TimerProviderContext.Provider {...props} value={value}>
      {children}
    </TimerProviderContext.Provider>
  );
}

export const useTime = () => {
  const context = useContext(TimerProviderContext);

  if (context === undefined)
    throw new Error("useTime must be used within a TimerProvider");

  return context;
};
