import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotesApp from "./pages/NotesApp/NotesApp";
import CreateNote from "./pages/CreateNote/CreateNote";

const router = createBrowserRouter([
  // {
  // path: "/",
  // element: <AppLayout />, // optional layout wrapper
  // children: [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/notes",
    element: <NotesApp />,
  },
  {
    path: "/create-note",
    element: <CreateNote />,
  },

  // ],
  // },
]);

export default router;
