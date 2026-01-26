import { useEffect } from "react";
import { useTheme } from "../../provider/theme-provider";
import { Header } from "./header";
import { NavigationBar } from "./navigation-bar";
import { Outlet } from "react-router";

export function AppLayout() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden ">
      <Header />
      <div className="w-full h-full flex flex-row">
        <NavigationBar />
        {<Outlet />}
      </div>
    </div>
  );
}
