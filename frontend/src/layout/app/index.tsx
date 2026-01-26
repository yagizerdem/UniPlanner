import { useEffect } from "react";
import { useTheme } from "../../provider/theme-provider";
import { Header } from "./header";
import { NavigationBar } from "./navigation-bar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden ">
      <Header />
      <div className="w-full h-full flex flex-row">
        <NavigationBar />
        {children}
      </div>
    </div>
  );
}
