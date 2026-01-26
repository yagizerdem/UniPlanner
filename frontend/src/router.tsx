import { createBrowserRouter } from "react-router";
import { Home } from "./components/home";
import { Timer } from "./components/timer";
import { AppLayout } from "./layout/app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/timer",
        element: <Timer />,
      },
    ],
  },
]);

export { router };
