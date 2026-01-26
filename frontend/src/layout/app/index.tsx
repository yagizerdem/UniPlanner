import { Header } from "./header";
import { NavigationBar } from "./navigation-bar";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-row overflow-hidden">
        <NavigationBar />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
