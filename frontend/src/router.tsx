import { createBrowserRouter } from "react-router";
import { Home } from "./components/home";
import { Timer } from "./components/timer";
import { AppLayout } from "./layout/app";
import { Notes } from "./components/notes";
import { Links } from "./components/links";

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
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/links",
        element: <Links />,
      },
    ],
  },
]);

export { router };
