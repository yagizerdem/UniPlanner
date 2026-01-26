import { createContext, useContext } from "react";
import { ThemeProvider } from "./theme-provider";
import { TimerProvider } from "./timer-provider";

type BaseProviderProps = {
  children: React.ReactNode;
};

type BaseProviderState = unknown;

const BaseProviderContext = createContext<BaseProviderState>({});

export function BaseProvider({ children, ...props }: BaseProviderProps) {
  return (
    <BaseProviderContext.Provider {...props} value={undefined}>
      <ThemeProvider>
        <TimerProvider>{children}</TimerProvider>
      </ThemeProvider>
    </BaseProviderContext.Provider>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (context === undefined)
    throw new Error("useBase must be used within a BaseProvider");

  return context;
};
