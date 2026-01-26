import { DefaultLayout } from "../default";
import { NavigationBar } from "./navigation-bar";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <DefaultLayout>
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex flex-row overflow-hidden">
          <NavigationBar />

          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
