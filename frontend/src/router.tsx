import { createBrowserRouter } from "react-router";
import { Home } from "./components/home";
import { Timer } from "./components/timer";
import { AppLayout } from "./layout/app";
import { Notes } from "./components/notes";

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
    ],
  },
]);

export { router };
